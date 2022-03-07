import react, { useState, useEffect, useCallback } from "react";
import {
  Layout,
  Page,
  Card,
  TextStyle,
  Spinner,
  Pagination,
  Frame,
  ResourceList,
  ResourceItem,
  Stack,
  Thumbnail,
  CalloutCard,
  List,
  Link,
} from "@shopify/polaris";
import tawkTo from "tawkto-react";

import { useAppBridge } from "@shopify/app-bridge-react";
import {
  TitleBar,
  Redirect,
  ButtonGroup,
  Modal,
  Button,
} from "@shopify/app-bridge/actions";

import { SettingsModal } from "../components/ModalsHelper";
import { useAxios } from "../hooks/useAxios";

import ButtonStyle from "../components/ButtonForIndex";

// analistics
import moment from "moment-timezone";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";

var dataAnalytics2 = [];
var dataAnalytics2New = [];
/////

const appInstallationGuide = "Private";
const appManual = "Private";
const placingTestOrder = "Private";
var oneTimeWork = true;
var oneTimeWorkToGetLocations = true;
var oneTimeWorkTawk = true;

var commonOrdersForPickup = 0;
var commonOrdersForDelivery = 0;
var commonOrdersForShipping = 0;
var totalPickupOrdersLocationsArray = [];
var totalDeliveryOrdersLocationsArray = [];
var totalShippingOrdersLocationsArray = [];
var totalDeliveryOrders = 0;
var defaultlocationsLength;

var locationInfoNameData;
var dataFromModalPages;
var modalPageData;
var locationNameData;
var addressData;
var cityData;
var countryData;
var postcodeData;

var payloadSend;

function Index({ shopOrigin, hosturl }) {
  const [pickupIconLink, setPickupIconLink] = useState("");
  const [deliveryIconLink, setDeliveryIconLink] = useState("");
  const [shippingIconLink, setShippingIconLink] = useState("");
  const appActiveUrl =
    "https://" + shopOrigin + "/admin/themes/current/editor?context=apps";
  const [axios] = useAxios();
  const [defaultlocations, setDefaultLocations] = useState([]);

  const [getLocationsDone, setGetLocationsDone] = useState(false);
  const [getOrdersDone, setGetOrdersDone] = useState(false);

  const [pagenitation, setPagenitation] = useState(false);
  const [cartSectionsDone, setCartSectionsDone] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousActivate, setHasPreviousActivate] = useState(false);
  const [hasNextActivate, setHasNextActivate] = useState(false);
  const [todosPerPage, setTodosPerPage] = useState(2);

  const [calloutCardIsActive, setCalloutCardIsActive] = useState(true);

  const handleCalloutCardIsActive = useCallback(() => {
    setCalloutCardIsActive(false);
    const setCalloutFalseUrl = "/api/locationcalloutcartroute/" + shopOrigin;
    const data = {
      isInstalationSectionActive: false,
    };
    axios.post(setCalloutFalseUrl, data);
  }, []);

  useEffect(() => {
    if (getLocationsDone && getOrdersDone) {
      setPagenitation(true);
    }
  }, [getLocationsDone, getOrdersDone]);

  useEffect(() => {
    if (oneTimeWorkToGetLocations) {
      oneTimeWorkToGetLocations = false;
      const url2 = "/api/location/" + shopOrigin;
      LoopFuntion(url2);
    }
  }, []);

  async function fetchNeed() {
    const openordersUrl = hosturl + "/shopifyorders/fetchneed";
    const data = {
      storeName: shopOrigin,
    };
    const resNeed = await axios.post(openordersUrl, data);
    return resNeed;
  }

  useEffect(() => {
    if (oneTimeWorkTawk) {
      oneTimeWorkTawk = false;
      fetchNeed().then((resNeed) => {
        tawkTo(resNeed.data.tawkToPropertyId, resNeed.data.tawkToKey);
        Tawk_API.visitor = {
          name: shopOrigin,
        };
      });
    }
  }, [oneTimeWorkTawk]);

  useEffect(() => {
    try {
      if (oneTimeWork) {
        oneTimeWork = false;
        const ordersGetUrl =
          "https://" +
          shopOrigin +
          "/admin/api/2021-07/orders.json?limit=240&status=open";
        fetchOrders2(ordersGetUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  async function fetchOrders2(ordersGetUrl) {
    const openordersUrl = hosturl + "/shopifyorders/openorders";
    const data = {
      newurl: ordersGetUrl,
    };
    await axios.post(openordersUrl, data).then((res) => {
      fetchOrders(res);
    });
  }

  function helperForAnalytics(method, order) {
    var created_at = order.created_at;
    var last30mounths = moment().subtract({
      days: 30,
    });
    if (last30mounths < moment(created_at)) {
      if (method === "Pickup") {
        dataAnalytics2.push({
          date: moment(created_at).format("MMM D"),
          Pickup: 1,
          Delivery: 0,
          Shipping: 0,
        });
      } else if (method === "Delivery") {
        dataAnalytics2.push({
          date: moment(created_at).format("MMM D"),
          Pickup: 0,
          Delivery: 1,
          Shipping: 0,
        });
      } else if (method === "Shipping") {
        dataAnalytics2.push({
          date: moment(created_at).format("MMM D"),
          Pickup: 0,
          Delivery: 0,
          Shipping: 1,
        });
      }
    }
  }

  async function fetchOrders(res) {
    const stringLinkUrl = res.data.link;
    const orderslength = res.data.data.orders.length;
    if (orderslength === 0) {
      setGetOrdersDone(true);
    } else {
      for (var i = 0; i < orderslength; i++) {
        if (res.data.data.orders[i].note_attributes.length > 0) {
          if (res.data.data.orders[i].fulfillment_status === null) {
            const foundMethod = res.data.data.orders[i].note_attributes.filter(
              (item) => "Method_Linkai" === item.name
            );
            const foundLocation = res.data.data.orders[
              i
            ].note_attributes.filter((item) => "Location_Linkai" === item.name);
            if (foundMethod.length > 0 && foundLocation.length > 0) {
              totalOrders++;
              if (foundMethod[0].value === "Pickup") {
                helperForAnalytics(
                  foundMethod[0].value,
                  res.data.data.orders[i]
                );
                if (foundLocation[0].value === "None") {
                  commonOrdersForPickup++;
                } else {
                  totalPickupOrdersLocationsArray.push(foundLocation[0].value);
                }
              } else if (foundMethod[0].value === "Delivery") {
                helperForAnalytics(
                  foundMethod[0].value,
                  res.data.data.orders[i]
                );
                if (foundLocation[0].value === "None") {
                  commonOrdersForDelivery++;
                } else {
                  totalDeliveryOrdersLocationsArray.push(
                    foundLocation[0].value
                  );
                }
              } else if (foundMethod[0].value === "Shipping") {
                helperForAnalytics(
                  foundMethod[0].value,
                  res.data.data.orders[i]
                );
                if (foundLocation[0].value === "None") {
                  commonOrdersForShipping++;
                } else {
                  totalShippingOrdersLocationsArray.push(
                    foundLocation[0].value
                  );
                }
              }
            }
          }
        }

        if (res.data.data.orders.length === i + 1) {
          const isReachedUrlNew = isReachedEndOfThePage(stringLinkUrl);
          if (isReachedUrlNew === "" || isReachedUrlNew === undefined) {
            var currentDate = "";
            var dataAnalytics2NewTemp = [];
            dataAnalytics2.map((itemDate, index) => {
              if (currentDate === "") {
                currentDate = itemDate.date;
                dataAnalytics2NewTemp.push(itemDate);
              } else if (currentDate === itemDate.date) {
                var lengthAnaly = dataAnalytics2NewTemp.length - 1;
                dataAnalytics2NewTemp[lengthAnaly].Pickup += itemDate.Pickup;
                dataAnalytics2NewTemp[lengthAnaly].Delivery +=
                  itemDate.Delivery;
                dataAnalytics2NewTemp[lengthAnaly].Shipping +=
                  itemDate.Shipping;
              } else if (currentDate !== itemDate.date) {
                currentDate = itemDate.date;
                dataAnalytics2NewTemp.push(itemDate);
              }
            });
            for (
              var tempVar = dataAnalytics2NewTemp.length;
              tempVar--;
              tempVar === -1
            ) {
              dataAnalytics2New.push(dataAnalytics2NewTemp[tempVar]);
            }

            setGetOrdersDone(true);
          } else {
            fetchOrders2(isReachedUrlNew);
          }
        }
      }
    }
  }

  function isReachedEndOfThePage(stringLinkUrl) {
    if (
      stringLinkUrl.length > 0 ||
      stringLinkUrl !== undefined ||
      stringLinkUrl !== null ||
      stringLinkUrl.length !== ""
    ) {
      var foundparameterfornext = stringLinkUrl.search("next");
      var foundparameterforprevious = stringLinkUrl.search("previous");

      if (foundparameterforprevious !== -1) {
        if (foundparameterfornext !== -1) {
          return stringLinkUrl
            .slice(foundparameterforprevious)
            .slice(
              stringLinkUrl.slice(foundparameterforprevious).search("<") + 1
            )
            .slice(
              0,
              stringLinkUrl
                .slice(foundparameterforprevious)
                .slice(
                  stringLinkUrl.slice(foundparameterforprevious).search("<") + 1
                )
                .search(">")
            );
        } else {
          return "";
        }
      } else if (foundparameterfornext !== -1) {
        const cleanValue = stringLinkUrl.slice(
          1,
          stringLinkUrl.search(";") - 1
        );
        return cleanValue;
      }
      // }
    } else {
      return "";
    }
  }

  const okButton = Button.create(app, { label: "Save" });
  const cancelButton = Button.create(app, { label: "Cancel" });

  const okButtonDelete = Button.create(app, { label: "Delete" });
  const cancelButtonDelete = Button.create(app, { label: "Cancel" });

  async function setLocations(
    shopOrigin,
    locationName,
    address,
    city,
    country,
    postcode
  ) {
    const url = "/api/location/" + shopOrigin;
    const data = {
      locationName: locationName,
      address: address,
      city: city,
      country: country,
      postcode: postcode,
    };
    const results22 = await axios
      .post(url, data)
      .catch((error) => console.log(error));
    return results22;
  }

  async function LoopFuntion(url) {
    await axios.get(url).then((getresponse2) => {
      var counter = 0;
      const isInstalationSectionActive =
        getresponse2.data.isInstalationSectionActive;
      if (isInstalationSectionActive !== undefined) {
        setCalloutCardIsActive(isInstalationSectionActive);
      }

      setPickupIconLink(getresponse2.data.pickupIconLink);
      setDeliveryIconLink(getresponse2.data.deliveryIconLink);
      setShippingIconLink(getresponse2.data.shippingIconLink);
      const detailsgetres = getresponse2.data.details;
      if (detailsgetres !== undefined) {
        detailsgetres.map((item) => {
          setDefaultLocations((prevNotes) => {
            var locationName = item.locationName;
            var address = item.address;
            var city = item.city;
            var country = item.country;
            var postcode = item.postcode;

            if (locationName === "empty" || locationName === null) {
              locationName = "";
            }
            if (address === "empty" || address === null) {
              address = "";
            }
            if (city === "empty" || city === null) {
              city = "";
            }
            if (country === "empty" || country === null) {
              country = "";
            }
            if (postcode === "empty" || postcode === null) {
              postcode = "";
            }

            return [
              ...prevNotes,
              [
                locationName,
                address + " " + city + " " + country + " " + postcode,
              ],
            ];
          });
          counter++;
        });
        if (todosPerPage >= counter) {
          setHasNextActivate(false);
        } else {
          setHasNextActivate(true);
        }
      }
      setGetLocationsDone(true);
    });
  }

  async function deleteLocationApi(shopOrigin, locationInfoName) {
    const url = "/api/locationdelete/" + shopOrigin;
    var data = {
      locationInfoName: locationInfoName,
    };
    const results = axios
      .post(url, data)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
    return results;
  }

  app.subscribe(Modal.Action.DATA, (action) => {
    dataFromModalPages = action;
    locationInfoNameData = dataFromModalPages.locationInfoName;
    modalPageData = dataFromModalPages.modalPage;
    locationNameData = dataFromModalPages.locationName;
    addressData = dataFromModalPages.address;
    cityData = dataFromModalPages.city;
    countryData = dataFromModalPages.country;
    postcodeData = dataFromModalPages.postcode;
  });

  okButton.subscribe(Button.Action.CLICK, () => {
    if (modalPageData === "addlocation") {
      if (
        locationNameData === null ||
        locationNameData === undefined ||
        locationNameData.trim() === ""
      ) {
        setToastContent("Error: location undefined");
        setActiveToast(true);
      } else {
        if (defaultlocationsLength % 2 === 0 && defaultlocationsLength > 0) {
          setHasNextActivate(true);
        }
        setLocations(
          shopOrigin,
          locationNameData,
          addressData,
          cityData,
          countryData,
          postcodeData
        );

        setDefaultLocations((prevNotes) => {
          return [
            ...prevNotes,
            [
              locationNameData,
              addressData +
                " " +
                cityData +
                " " +
                countryData +
                " " +
                postcodeData,
            ],
          ];
        });

        setToastContent("Store Succesfully Saved");
        setActiveToast(true);
        myModal.dispatch(Modal.Action.CLOSE);
      }
    }
  });

  cancelButton.subscribe(Button.Action.CLICK, () => {
    myModal.dispatch(Modal.Action.CLOSE);
  });

  okButtonDelete.subscribe(Button.Action.CLICK, () => {
    if (modalPageData === "deletelocation") {
      if (
        locationInfoNameData === undefined ||
        locationInfoNameData === null ||
        locationInfoNameData.trim() === ""
      ) {
        setToastContent("Error: location undefined");
        setActiveToast(true);
      } else {
        deleteLocationApi(shopOrigin, locationInfoNameData);
        setToastContent("Store Succesfully Delete");
        setActiveToast(true);
        myModal2.dispatch(Modal.Action.CLOSE);
      }
    }
  });

  cancelButtonDelete.subscribe(Button.Action.CLICK, () => {
    myModal2.dispatch(Modal.Action.CLOSE);
  });

  const modalOptions = {
    title: "New Location",
    path: "/addlocation",
    footer: {
      buttons: {
        primary: okButton,
        secondary: [cancelButton],
      },
    },
  };

  const modalOptionsDelete = {
    title: "Delete Location",
    path: "/deletelocation",
    footer: {
      buttons: {
        primary: okButtonDelete,
        secondary: [cancelButtonDelete],
      },
    },
  };

  async function fetchDeliveryApi(shopOrigin, locationInfoName) {
    const url = "/api/location/" + shopOrigin;

    var generalPickupStorejs;
    var generalDeliveryStorejs;
    var generalShippingStorejs;
    var isPickupLocationsActive;
    var isDeliveryLocationsActive;
    var isShippingLocationsActive;

    var pickUpActiveStorejs;
    var deliveryActiveStorejs;
    var shippingActiveStorejs;

    var storetimezoneStorejs;
    var storelocaleStorejs;

    const results = await axios
      .get(url)
      .then((res) => {
        const responseLengh = res.data.details.length;

        generalPickupStorejs = res.data.generalPickup;
        generalDeliveryStorejs = res.data.generalDelivery;
        generalShippingStorejs = res.data.generalShipping;
        isPickupLocationsActive = res.data.Pickup.activeLocations;
        isDeliveryLocationsActive = res.data.Delivery.activeLocations;
        isShippingLocationsActive = res.data.Shipping.activeLocations;

        for (var i = 0; i < responseLengh; i++) {
          var locationName = res.data.details[i].locationName;
          if (locationName === locationInfoName) {
            pickUpActiveStorejs = res.data.details[i].Pickup.active;
            deliveryActiveStorejs = res.data.details[i].Delivery.active;
            shippingActiveStorejs = res.data.details[i].Shipping.active;
            storetimezoneStorejs = res.data.details[i].storetimezone;
            storelocaleStorejs = res.data.details[i].storelocale;
          }
          if (i + 1 === responseLengh) {
            payloadSend = {
              modalPage: "settingsGetting",

              pickUpActiveStorejs: pickUpActiveStorejs,
              deliveryActiveStorejs: deliveryActiveStorejs,
              shippingActiveStorejs: shippingActiveStorejs,
              generalPickupStorejs: generalPickupStorejs,
              generalDeliveryStorejs: generalDeliveryStorejs,
              generalShippingStorejs: generalShippingStorejs,
              isPickupLocationsActive: isPickupLocationsActive,
              isDeliveryLocationsActive: isDeliveryLocationsActive,
              isShippingLocationsActive: isShippingLocationsActive,

              storetimezoneStorejs: storetimezoneStorejs,
              storelocaleStorejs: storelocaleStorejs,
            };

            app.subscribe(Modal.Action.DATA, ({ action, data }) => {
              switch (action) {
                case "LOADED": {
                  app.dispatch(Modal.data(payloadSend));
                  break;
                }
                default: {
                  break;
                }
              }
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return results;
  }

  const myModal = Modal.create(app, modalOptions);
  const myModal2 = Modal.create(app, modalOptionsDelete);

  const redirectToAddLocation = useCallback(() => {
    myModal.dispatch(Modal.Action.OPEN);
  }, []);

  const redirectToDeleteLocation = useCallback(() => {
    myModal2.dispatch(Modal.Action.OPEN);
  }, []);

  const newLocationbtn = Button.create(app, { label: "New Location" });
  const deleteLocation = Button.create(app, { label: "Delete Location" });

  newLocationbtn.subscribe("click", redirectToAddLocation);
  deleteLocation.subscribe("click", redirectToDeleteLocation);

  const moreActions = ButtonGroup.create(app, {
    label: "More actions",
    buttons: [newLocationbtn, deleteLocation],
  });

  const titleBarOptions = {
    title: "Control Panel",
    buttons: {
      secondary: [moreActions],
    },
  };
  const myTitleBar = TitleBar.create(app, titleBarOptions);

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const storeName = defaultlocations.slice(indexOfFirstTodo, indexOfLastTodo);
  defaultlocationsLength = defaultlocations.length;

  function previousPage() {
    if (currentPage === 2 && hasPreviousActivate) {
      setHasPreviousActivate(false);
    }
    if (indexOfFirstTodo > 0) {
      setCurrentPage(currentPage - 1);
      setHasNextActivate(true);
    }
  }

  function nextPage(currentPage) {
    if (
      defaultlocations.length - (todosPerPage * 2 - 1) < indexOfLastTodo &&
      hasNextActivate
    ) {
      setHasNextActivate(false);
    }

    if (defaultlocations.length > indexOfLastTodo) {
      setCurrentPage(currentPage + 1);
      setHasPreviousActivate(true);
    }
  }

  const orderQuantityCalculatorFunc = (
    locationName,
    totalPickupOrdersLocationsArray
  ) => {
    var totalPickupOrders = 0;

    for (var i = 0; i < totalPickupOrdersLocationsArray.length; i++) {
      if (locationName === totalPickupOrdersLocationsArray[i]) {
        totalPickupOrders++;
      }
      if (i === totalPickupOrdersLocationsArray.length - 1) {
        return totalPickupOrders;
      }
    }
    return totalPickupOrders;
  };

  const cartSections = storeName.map((item) => (
    <Layout.Section oneHalf key={item}>
      <Card
        title={item[0]}
        actions={[
          {
            content: "Settings",
            onAction: () => {
              fetchDeliveryApi(shopOrigin, item[0]);
              SettingsModal(app, true, axios, shopOrigin, item[0]);
            },
          },
        ]}
      >
        <Card.Section>
          <p>Address: {item[1]}</p>
        </Card.Section>
        <Card.Section>
          <TextStyle variation="strong">
            Total{" "}
            {orderQuantityCalculatorFunc(
              item[0],
              totalPickupOrdersLocationsArray
            ) +
              commonOrdersForPickup +
              orderQuantityCalculatorFunc(
                item[0],
                totalDeliveryOrdersLocationsArray
              ) +
              commonOrdersForDelivery +
              orderQuantityCalculatorFunc(
                item[0],
                totalShippingOrdersLocationsArray
              ) +
              commonOrdersForShipping}{" "}
            orders{" "}
          </TextStyle>
          <TextStyle>available to </TextStyle>
          <ButtonStyle />
        </Card.Section>
        <Card.Section title="Pickup">
          <ResourceList
            resourceName={{ singular: "product", plural: "products" }}
            items={[
              {
                id: 341,
                url: "produdcts/341",
                name: "Orders Ready to Go",
                sku: "9234194023",
                quantity:
                  orderQuantityCalculatorFunc(
                    item[0],
                    totalPickupOrdersLocationsArray
                  ) + commonOrdersForPickup,
                media: (
                  <Thumbnail
                    size="small"
                    source={pickupIconLink}
                    alt="Pickup"
                  />
                ),
              },
            ]}
            renderItem={(item) => {
              const { id, url, name, sku, media, quantity } = item;

              return (
                <ResourceItem
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                  onClick={() => {
                    redirect.dispatch(Redirect.Action.APP, "/orders");
                  }}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>

                  <div>
                    <TextStyle variation="strong">{quantity} orders </TextStyle>
                    available for collection
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card.Section>

        {/* ////////////////////////////////////////////////////////////// */}

        <Card.Section title="Delivery">
          <ResourceList
            resourceName={{ singular: "product", plural: "products" }}
            items={[
              {
                id: 256,
                url: "produdcts/256",
                name: "Orders Ready to Go",
                sku: "9234194010",
                quantity:
                  orderQuantityCalculatorFunc(
                    item[0],
                    totalDeliveryOrdersLocationsArray
                  ) + commonOrdersForDelivery,
                media: (
                  <Thumbnail
                    size="small"
                    source={deliveryIconLink}
                    alt="Delivery"
                  />
                ),
              },
            ]}
            renderItem={(item) => {
              const { id, url, name, sku, media, quantity } = item;

              return (
                <ResourceItem
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                  onClick={() => {
                    redirect.dispatch(Redirect.Action.APP, "/orders");
                  }}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  {/* <div>SKU: {sku}</div> */}
                  <div>
                    <TextStyle variation="strong">{quantity} orders </TextStyle>
                    available for delivery
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card.Section>

        {/* ////////////////////////////////////////////////////////////// */}

        <Card.Section title="Shipping">
          <ResourceList
            resourceName={{ singular: "product", plural: "products" }}
            items={[
              {
                id: 256,
                url: "produdcts/256",
                name: "Orders Ready to Go",
                sku: "9234194010",
                quantity:
                  orderQuantityCalculatorFunc(
                    item[0],
                    totalShippingOrdersLocationsArray
                  ) + commonOrdersForShipping,
                media: (
                  <Thumbnail
                    size="small"
                    source={shippingIconLink}
                    alt="Shipping"
                  />
                ),
              },
            ]}
            renderItem={(item) => {
              const { id, url, name, sku, media, quantity } = item;

              return (
                <ResourceItem
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                  onClick={() => {
                    redirect.dispatch(Redirect.Action.APP, "/orders");
                  }}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  {/* <div>SKU: {sku}</div> */}
                  <div>
                    <TextStyle variation="strong">{quantity} orders </TextStyle>
                    available for shipping
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card.Section>
      </Card>
    </Layout.Section>
  ));

  useEffect(() => {
    try {
      if (cartSections.length > 0) {
        setCartSectionsDone(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cartSections]);

  const helpCartFunc = () => {
    if (calloutCardIsActive) {
      return (
        <Layout.Section>
          <CalloutCard
            title="Setup & Test Guide"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "More Articles",
              url: appManual,
              external: true,
            }}
            onDismiss={handleCalloutCardIsActive}
          >
            <p>
              The app installation guide and test the features please follow
              instructions below.
            </p>

            <List type="number">
              <List.Item>
                To activate the app,{" "}
                <Link url={appActiveUrl} external>
                  please click
                </Link>
                , the link will redirect you to the app embeds, and then turn on
                Linkai app, App embed blocks are supported in vintage and in
                Online Store 2.0 themes, if it does not support then the app
                will automatically be activated. This activates the app for
                storefront. App embed blocks are important for faster page load,
                editing, and after uninstalling the app, you do not need to
                delete code from theme files, they will automatically be
                deleted.
              </List.Item>
              <List.Item>
                The app setup guide is available{" "}
                <Link url={appInstallationGuide} external>
                  on this article.
                </Link>
              </List.Item>
              <List.Item>
                After completing steps above, you can start to test the app by
                placing a test order, you can look at this{" "}
                <Link url={placingTestOrder} external>
                  article
                </Link>
                . After placing a test order, open the app to demonstrate
                changes.
              </List.Item>
            </List>
          </CalloutCard>
          <br />
        </Layout.Section>
      );
    }
  };

  const analyticsFunc = () => {
    if (dataAnalytics2New.length > 0) {
      return (
        <Layout.Section>
          <br />
          <Stack alignment="center" distribution="center">
            <TextStyle variation="subdued">Orders Over Time</TextStyle>
          </Stack>
          <Stack alignment="center" distribution="center">
            <ComposedChart width={800} height={250} data={dataAnalytics2New}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid
                stroke="#dedee7"
                strokeDasharray="4"
                vertical="false"
              />
              <Line type="monotone" dataKey="Pickup" stroke="#8884d8" />
              <Line type="monotone" dataKey="Delivery" stroke="#413ea0" />
              <Line type="monotone" dataKey="Shipping" stroke="#ff7300" />
            </ComposedChart>
          </Stack>
          <br />
        </Layout.Section>
      );
    }
  };

  const wholepage = (
    <Layout>
      <br />
      {helpCartFunc()}
      {analyticsFunc()}
      {cartSections}
      {cartSectionsDone && (
        <Layout.Section>
          <Stack alignment="center" distribution="center">
            <Pagination
              label={currentPage}
              hasPrevious={hasPreviousActivate}
              onPrevious={() => previousPage(currentPage)}
              hasNext={hasNextActivate}
              onNext={() => nextPage(currentPage)}
            />
          </Stack>
          <br />
          <br />
        </Layout.Section>
      )}
    </Layout>
  );

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Page title="Control Panel">
          {pagenitation ? (
            wholepage
          ) : (
            <Spinner accessibilityLabel="Spinner example" size="large" />
          )}
        </Page>
      </Frame>
    </div>
  );
}

export default Index;
