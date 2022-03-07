import axios from "axios";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import { emailnoticecreate } from "../emailNotice/emailnotice";

import Location from "../../database/models/locationModel";
import moment from "moment";

const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });
const Router = require("koa-router");
const appOrdersPaidRoute = new Router();

const webhookUrl = "/webhooks/app/orderspaid";

//
//MARK:- Webhook
//

const appOrdersPaidWebhook = async (shop, accessToken) => {
  const webhookStatus = await registerWebhook({
    address: `${process.env.HOST}${webhookUrl}`,
    topic: "ORDERS_PAID",
    accessToken,
    shop,
    apiVersion: "2022-01",
  });
  // console.log("webhookStatus", webhookStatus);
  webhookStatus.success
    ? console.log(`--> Successfully registered orderspaid webhook for ${shop}`)
    : console.log(
        "--> Failed to register orderspaid webhook",
        webhookStatus.result.data.webhookSubscriptionCreate.userErrors
      );
};

//
//MARK:- Route
//

appOrdersPaidRoute.post(`${webhookUrl}`, webhook, async (ctx) => {
  const shop = ctx.state.webhook.domain;
  const obj = ctx.state.webhook.payload;
  const session = await Shopify.Utils.loadOfflineSession(shop);
  const accessToken = session.accessToken;

  //////////////////// Tagging Orders  //////////////////
  const storename = await Location.findOne({ storename: shop });
  if (storename) {
    const tagOrders = storename.tagOrders;
    const orderId = obj.id;
    console.log("tagOrders", tagOrders);
    //
    const orderWithIdUrl =
      "https://" + shop + "/admin/api/2022-01/orders/" + orderId + ".json";

    var tagOrderString = "";
    var isFirstDone = false;

    function duzenle(foundata) {
      if (
        foundata[0].value !== "" &&
        foundata[0].value !== null &&
        foundata[0].value !== "Undefined" &&
        foundata[0].value !== "None" &&
        foundata[0].value !== "none"
      ) {
        if (isFirstDone) {
          tagOrderString =
            tagOrderString + ", " + foundata[0].value.replace(",", " ");
        } else {
          tagOrderString = tagOrderString + foundata[0].value.replace(",", " ");
          isFirstDone = true;
        }
      }
    }
    for (let x in tagOrders) {
      if (tagOrders[x]) {
        if (x === "checkedTagMethod") {
          const foundMethod = obj.note_attributes.filter(
            (item) => "Method_Linkai" === item.name
          );
          duzenle(foundMethod);
        } else if (x === "checkedTagLocation") {
          const foundLocation = obj.note_attributes.filter(
            (item) => "Location_Linkai" === item.name
          );
          duzenle(foundLocation);
        } else if (x === "checkedTagDate") {
          const foundDate = obj.note_attributes.filter(
            (item) => "Date_LinkAi" === item.name
          );
          duzenle(foundDate);
        }
      }
    }

    const orderEditData = {
      order: { id: orderId, tags: tagOrderString },
    };
    axios
      .put(orderWithIdUrl, orderEditData, {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      })
      // .then((order) => {
      //   console.log(order.data);
      // });
      //
      .catch((error) => {
        console.error("Error:", error);
      });

    //////////////////// Cleaning Past Order Info at DB  //////////////////

    if (storename.keepOrdersPerTimeSlotCustom.length > 0) {
      const itemarray = storename.keepOrdersPerTimeSlotCustom;
      for (var iii = 0; iii < itemarray.length; iii++) {
        var onlyDate = itemarray[iii].Date.slice(0, 10);

        var currentDate = moment(onlyDate, "DD.MM.YYYY");
        var todaysDate = moment();

        // geciktirme
        todaysDate = todaysDate.subtract({
          days: 10,
        });
        if (currentDate < todaysDate) {
          if (iii > -1) {
            itemarray.splice(iii, 1);
          }
        }
      }
      storename.keepOrdersPerTimeSlotCustom = itemarray;
    }

    if (storename.keepOrdersPerTimeSlot.length > 0) {
      const itemarray = storename.keepOrdersPerTimeSlot;
      for (var iii = 0; iii < itemarray.length; iii++) {
        var onlyDate = itemarray[iii].Date.slice(0, 10);

        var currentDate = moment(onlyDate, "DD.MM.YYYY");
        var todaysDate = moment();

        todaysDate = todaysDate.subtract({
          days: 10,
        });

        if (currentDate < todaysDate) {
          console.log("evet KUCUK");
          if (iii > -1) {
            itemarray.splice(iii, 1);
          }
        }
      }
      storename.keepOrdersPerTimeSlot = itemarray;
    }

    await storename.save();
  }

  console.log(`--> OrdersPaid records for ${shop}`);
});

module.exports = { appOrdersPaidWebhook, appOrdersPaidRoute };
