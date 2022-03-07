import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import fs from "fs";
import routes from "../database/routes/combineRoutes";
import backendroutes from "../database/routes/combineRoutesBackend";
import { checkTheme } from "./checkTheme/checkTheme";

// import sessionStorage from "./utils/SessionHandler";
import RedisStore from "./utils/redis-store";
import {
  get_ACTIVE_SHOPIFY_SHOPS,
  post_ACTIVE_SHOPIFY_SHOPS,
  delete_ACTIVE_SHOPIFY_SHOPS,
  delete_ShopInfo,
} from "./utils/helperApiCalls";

import { Session } from "@shopify/shopify-api/dist/auth/session";
import store from "store-js";
import { ASTValidationContext } from "graphql/validation/ValidationContext";
const mongoose = require("mongoose");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
// const CORS = require("cors");
const serve = require("koa-static");
import {
  createClient,
  getOneTimeUrl,
  getSubscriptionUrl,
  getAppSubscriptionStatus,
} from "./handlers";
import { addLocations, createCarrierService } from "./adminapis";

dotenv.config();

const webhooksRegistrar = require("./webhooks/_webhooksRegistrar.js");
const webhookRouters = require("./webhooks/_webhookRouters.js");

const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });

const sessionStorage = new RedisStore();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.January22,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy

  // SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),

  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback
  ),
});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

const ACTIVE_SHOPIFY_SHOPS = {};

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (err) {
  console.error("MongoDB event error: " + err);
});

const server = new Koa();
const router = new Router();

router.use(cors());
server.use(serve("./public"));
server.use(backendroutes());

var isAllDone = false;
app.prepare().then(async () => {
  ////////////////////////////////////////////////

  server.keys = [Shopify.Context.API_SECRET_KEY];

  const getInfos = get_ACTIVE_SHOPIFY_SHOPS();

  getInfos.then(async (resgetInfos) => {
    console.log("resgetInfos.length", resgetInfos.length);
    if (resgetInfos.length > 0) {
      resgetInfos.map(async (objectItem, index) => {
        ACTIVE_SHOPIFY_SHOPS[objectItem.shop] = objectItem.scope;
        if (index + 1 === resgetInfos.length) {
          isAllDone = true;
        }
      });
    } else if (resgetInfos.length === 0) {
      isAllDone = true;
    }
  });

  server.use(
    createShopifyAuth({
      accessMode: "online",
      prefix: "/online",
      async afterAuth(ctx) {
        // Online access mode access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;

        // Redirect to app with shop parameter upon auth
        // ctx.redirect(`/?shop=${shop}&host=${host}`);
        ctx.redirect(
          `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`
        );
      },
    })
  );

  server.use(
    createShopifyAuth({
      accessMode: "offline",
      prefix: "/offline",
      async afterAuth(ctx) {
        // Offline access mode access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        try {
          await post_ACTIVE_SHOPIFY_SHOPS(shop, scope);
          const isStoreExist = await addLocations(shop, accessToken);
          console.log("isStoreExist", isStoreExist);
          if (!isStoreExist) {
            await createCarrierService(shop, accessToken);
            await webhooksRegistrar(shop, accessToken);
          }
          console.log("Start to check theme");
          await checkTheme(shop, accessToken);
        } catch (error) {
          console.log("error: ", error);
        }
        server.context.client = createClient(shop, accessToken);
        const redirectUrlSub = `/online/auth/?shop=${shop}`;
        const subUrl = await getSubscriptionUrl(ctx, redirectUrlSub);
        ctx.redirect(subUrl);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  const verifyIfActiveShopifyShop = async (ctx, next) => {
    try {
      const { shop } = ctx.query;

      // This shop hasn't been seen yet, go through OAuth to create a session

      if (isAllDone) {
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
          ctx.redirect(`/offline/auth?shop=${shop}`);
          return;
        } else {
          const session = await Shopify.Utils.loadOfflineSession(shop);
          const accessToken = session.accessToken;
          // console.log("session", session);
          server.context.client = await createClient(shop, accessToken);
          const hasSubscription = await getAppSubscriptionStatus(
            ctx,
            accessToken,
            shop
          );
          console.log("hasSubscription", hasSubscription);
          if (hasSubscription) {
            return next();
          } else {
            console.log(shop + " isn't in paid plan.");
            ctx.redirect(`/offline/auth?shop=${shop}`);
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true, authRoute: "/online/auth" }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  async function injectSession(ctx, next) {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    ctx.sesionFromToken = session;
    if (session?.shop && session?.accessToken) {
      const client = new Shopify.Clients.Rest(
        session.shop,
        session.accessToken
      );
      ctx.myClient = client;
    }
    return next();
  }

  router.post("/webhooks/app/uninstall", webhook, async (ctx) => {
    const shop = ctx.state.webhook.domain;

    delete ACTIVE_SHOPIFY_SHOPS[shop];
    await delete_ShopInfo(shop);
    await delete_ACTIVE_SHOPIFY_SHOPS(shop);
    sessionStorage.deleteCallback(shop);

    console.log(`--> Deleted records for ${shop}`);
  });

  server.use(webhookRouters());

  server.use(injectSession);
  server.use(routes());

  router.get("(/_next/static/.*)", handleRequest);
  router.get("/_next/webpack-hmr", handleRequest);

  // Embedded app Next.js entry point
  router.get("(.*)", verifyIfActiveShopifyShop, handleRequest);

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
