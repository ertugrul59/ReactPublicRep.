import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  EmptyState,
  Layout,
  Page,
  PageActions,
  Card,
  Spinner,
  OptionList,
  Toast,
  TextField,
  TextStyle,
  ResourceList,
  Banner,
  Heading,
  Frame,
  Select,
  FormLayout,
  Button,
  Stack,
  Checkbox,
  Thumbnail,
  SettingToggle,
} from "@shopify/polaris";
import { TittleBar } from "../components/TittleBarOptions";
const queryString = require("query-string");
import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import { useAxios } from "../hooks/useAxios";

var alreadySelectedProducts = [];
var alreadySelectedProductsPickup = [];
var alreadySelectedProductsDelivery = [];
var alreadySelectedProductsShipping = [];
var alreadySelectedProductsPreperationTime = [];
var alreadySelectedProductsMixMaxLimits = [];
var oneTimeTrue = true;
var parsedLocation;
var firstLocation = "";

function advancedlimitsedit({ shopOrigin }) {
  const [axios] = useAxios();
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  TittleBar(app, "advancedlimits", "Advanced Limits");

  async function getLocations(shopOrigin) {
    const url = "/api/location/" + shopOrigin;
    const returnfield = await axios.get(url);
    return returnfield;
  }

  const [showVariants, setShowVariants] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [
    valueTextFieldProductPreperationTime,
    setValueTextFieldProductPreperationTime,
  ] = useState({});
  const [valueTextFieldMinMaxLimit, setValueTextFieldMinMaxLimit] = useState(
    {}
  );

  const [emptyStateProductPreperation, setEmptyStateProductPreperation] =
    useState(true);
  const [emptyStateMinMaxLimit, setEmptyStateMinMaxLimit] = useState(true);
  const [isCheckFor, setIsCheckFor] = useState("");

  const [productListDefaultMinMaxLimit, setProductListDefaultMinMaxLimit] =
    useState([]);

  const [
    productListDefaultProductPreperationTime,
    setProductListDefaultProductPreperationTime,
  ] = useState([]);

  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const options = [
    { label: "All", value: "All" },
    { label: "Pickup", value: "Pickup" },
    { label: "Delivery", value: "Delivery" },
    { label: "Shipping", value: "Shipping" },
  ];

  const [activeToggle, setToggleActive] = useState(false);

  const toggleActive = useCallback(
    () => setToggleActive((active) => !active),
    []
  );

  const toastMarkup = activeToggle ? (
    <Toast content="Save Success" onDismiss={toggleActive} />
  ) : null;

  const [active, setActive] = useState(false);

  const contentStatus = active ? "Deactivate" : "Activate";
  const textStatus = active ? "activated" : "deactivated";

  useEffect(() => {
    try {
      const parsed = queryString.parse(location.search);
      parsedLocation = parsed.location;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (oneTimeTrue) {
        oneTimeTrue = false;
        getLocations(shopOrigin)
          .then((getresponse) => {
            const details = getresponse.data.details;
            const lengthdetails = details.length;
            firstLocation = details[0].locationName;
            for (var i = 0; i < lengthdetails; i++) {
              if (details[i].locationName === parsedLocation) {
                if (details[i].locationAdvancedLimits !== undefined) {
                  if (
                    details[i].locationAdvancedLimits
                      .locationAdvancedLimitsActive !== undefined
                  ) {
                    setActive(
                      details[i].locationAdvancedLimits
                        .locationAdvancedLimitsActive
                    );
                  }
                  if (
                    details[i].locationAdvancedLimits
                      .disableProductsForDelivery !== undefined
                  ) {
                    if (
                      details[i].locationAdvancedLimits
                        .disableProductsForDelivery.length > 0
                    ) {
                      alreadySelectedProductsDelivery =
                        details[i].locationAdvancedLimits
                          .disableProductsForDelivery;
                    }
                  }
                  if (
                    details[i].locationAdvancedLimits
                      .disableProductsForPickup !== undefined
                  ) {
                    if (
                      details[i].locationAdvancedLimits.disableProductsForPickup
                        .length > 0
                    ) {
                      alreadySelectedProductsPickup =
                        details[i].locationAdvancedLimits
                          .disableProductsForPickup;
                    }
                  }

                  if (
                    details[i].locationAdvancedLimits
                      .disableProductsForShipping !== undefined
                  ) {
                    alreadySelectedProductsShipping =
                      details[i].locationAdvancedLimits
                        .disableProductsForShipping;
                  }

                  if (
                    details[i].locationAdvancedLimits
                      .minMaxQuantityLimitsForProducts !== undefined
                  ) {
                    setValueTextFieldMinMaxLimit(
                      details[i].locationAdvancedLimits
                        .minMaxQuantityLimitsForProducts
                    );

                    Object.keys(
                      details[i].locationAdvancedLimits
                        .minMaxQuantityLimitsForProducts
                    ).map(function (key, index) {
                      alreadySelectedProductsMixMaxLimits.push({
                        id: details[i].locationAdvancedLimits
                          .minMaxQuantityLimitsForProducts[key].id,
                      });
                    });

                    setProductListDefaultMinMaxLimit(
                      details[i].locationAdvancedLimits
                        .productListDefaultMinMaxLimit
                    );

                    if (
                      details[i].locationAdvancedLimits
                        .productListDefaultMinMaxLimit.length > 0
                    ) {
                      setEmptyStateMinMaxLimit(false);
                    }
                  }

                  ///

                  if (
                    details[i].locationAdvancedLimits
                      .preperationTimeBasedOnProduct !== undefined
                  ) {
                    setValueTextFieldProductPreperationTime(
                      details[i].locationAdvancedLimits
                        .preperationTimeBasedOnProduct
                    );

                    Object.keys(
                      details[i].locationAdvancedLimits
                        .preperationTimeBasedOnProduct
                    ).map(function (key, index) {
                      alreadySelectedProductsPreperationTime.push({
                        id: details[i].locationAdvancedLimits
                          .preperationTimeBasedOnProduct[key].id,
                      });
                    });

                    setProductListDefaultProductPreperationTime(
                      details[i].locationAdvancedLimits
                        .productListDefaultProductPreperationTime
                    );

                    if (
                      details[i].locationAdvancedLimits
                        .productListDefaultProductPreperationTime.length > 0
                    ) {
                      setEmptyStateProductPreperation(false);
                    }
                  }
                }
              }
            }
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const img =
    "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

  const ResourceListProductPreperationTimeFunc = () => {
    return (
      <Card>
        <br />
        <Stack alignment="center" distribution="center">
          <Button
            plain={false}
            primary={true}
            onClick={() => {
              alreadySelectedProducts = alreadySelectedProductsPreperationTime;
              setShowVariants(false);
              setIsCheckFor("productPreperationTime");
              setModal({ open: true });
            }}
          >
            Add product
          </Button>
        </Stack>
        <br />
        <ResourceList
          showHeader
          resourceName={{ singular: "Product", plural: "Products" }}
          items={productListDefaultProductPreperationTime}
          renderItem={(item) => {
            const media = (
              <Thumbnail
                source={item.images[0] ? item.images[0].originalSrc : ""}
                alt={item.images[0] ? item.images[0].altText : ""}
              />
            );

            return (
              <ResourceList.Item
                id={item.id}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <Stack>
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">{item.title}</TextStyle>
                    </h3>
                  </Stack.Item>
                  <Stack.Item>
                    <TextField
                      id={item.title}
                      min="1"
                      label="Preperation Time"
                      type="number"
                      value={
                        valueTextFieldProductPreperationTime[item.title]
                          ? valueTextFieldProductPreperationTime[item.title]
                              .timingvalue
                          : "1"
                      }
                      onChange={(value, id) => {
                        setValueTextFieldProductPreperationTime((prevNotes) => {
                          return {
                            ...prevNotes,
                            [id]: {
                              id: valueTextFieldProductPreperationTime[id].id,
                              timingvalue: value,
                              unit: valueTextFieldProductPreperationTime[id]
                                .unit,
                            },
                          };
                        });
                      }}
                      // error={Boolean(!weight && unit)}
                      autoComplete="off"
                    />
                    <Select
                      id={item.title}
                      label=" "
                      placeholder="Select"
                      options={["Minutes", "Hours", "Days"]}
                      value={
                        valueTextFieldProductPreperationTime[item.title]
                          ? valueTextFieldProductPreperationTime[item.title]
                              .unit
                          : "Minutes"
                      }
                      onChange={(value, id) => {
                        setValueTextFieldProductPreperationTime((prevNotes) => {
                          return {
                            ...prevNotes,
                            [id]: {
                              id: valueTextFieldProductPreperationTime[id].id,
                              timingvalue:
                                valueTextFieldProductPreperationTime[id]
                                  .timingvalue,
                              unit: value,
                            },
                          };
                        });
                      }}
                      // error={Boolean(!unit && weight)}
                    />
                  </Stack.Item>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    );
  };

  const ResourceListMinMaxLimitFunc = () => {
    return (
      <Card>
        <br />
        <Stack alignment="center" distribution="center">
          <Button
            plain={false}
            primary={true}
            onClick={() => {
              alreadySelectedProducts = alreadySelectedProductsMixMaxLimits;
              setShowVariants(false);
              setIsCheckFor("MinMax");
              setModal({ open: true });
            }}
          >
            Add product
          </Button>
        </Stack>
        <br />
        <ResourceList
          showHeader
          resourceName={{ singular: "Product", plural: "Products" }}
          items={productListDefaultMinMaxLimit}
          renderItem={(item) => {
            const media = (
              <Thumbnail
                source={item.images[0] ? item.images[0].originalSrc : ""}
                alt={item.images[0] ? item.images[0].altText : ""}
              />
            );

            return (
              <ResourceList.Item
                id={item.id}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <Stack>
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">{item.title}</TextStyle>
                    </h3>
                  </Stack.Item>
                  <Stack.Item>
                    <Select
                      id={item.title}
                      label="Method"
                      options={options}
                      onChange={(value, id) => {
                        setValueTextFieldMinMaxLimit((prevNotes) => {
                          return {
                            ...prevNotes,
                            // [id]: value,
                            [id]: {
                              id: valueTextFieldMinMaxLimit[id].id,
                              method: value,
                              min: valueTextFieldMinMaxLimit[id].min,
                              max: valueTextFieldMinMaxLimit[id].max,
                            },
                          };
                        });
                      }}
                      value={
                        valueTextFieldMinMaxLimit[item.title]
                          ? valueTextFieldMinMaxLimit[item.title].method
                          : "All"
                      }
                    />
                  </Stack.Item>
                  <Stack.Item>
                    <TextField
                      id={item.title}
                      label="Min"
                      type="number"
                      max="100"
                      min="1"
                      placeholder="No"
                      value={
                        valueTextFieldMinMaxLimit[item.title]
                          ? valueTextFieldMinMaxLimit[item.title].min
                          : "0"
                      }
                      onChange={(value, id) => {
                        setValueTextFieldMinMaxLimit((prevNotes) => {
                          return {
                            ...prevNotes,
                            [id]: {
                              id: valueTextFieldMinMaxLimit[id].id,
                              method: valueTextFieldMinMaxLimit[id].method,
                              min: value,
                              max: valueTextFieldMinMaxLimit[id].max,
                            },
                          };
                        });
                      }}
                    />
                  </Stack.Item>
                  <Stack.Item>
                    <TextField
                      id={item.title}
                      label="Max"
                      type="number"
                      max="100"
                      min="1"
                      placeholder="No"
                      value={
                        valueTextFieldMinMaxLimit[item.title]
                          ? valueTextFieldMinMaxLimit[item.title].max
                          : "0"
                      }
                      onChange={(value, id) => {
                        setValueTextFieldMinMaxLimit((prevNotes) => {
                          return {
                            ...prevNotes,
                            [id]: {
                              id: valueTextFieldMinMaxLimit[id].id,
                              method: valueTextFieldMinMaxLimit[id].method,
                              max: value,
                              min: valueTextFieldMinMaxLimit[id].min,
                            },
                          };
                        });
                      }}
                    />
                  </Stack.Item>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    );
  };

  const redirectToClC = useCallback(
    () => redirect.dispatch(Redirect.Action.APP, "/advancedlimits"),
    []
  );

  async function setAdvancedLimitsEdit(
    shopOrigin,
    parsedLocation,
    active,
    checked,
    minMaxQuantityLimitsForProducts,
    productListDefaultMinMaxLimit,
    preperationTimeBasedOnProduct,
    productListDefaultProductPreperationTime,
    disableProductsForDelivery,
    disableProductsForPickup,
    disableProductsForShipping
  ) {
    const url =
      "/api/advancedlimitsedit/" +
      shopOrigin +
      "/" +
      parsedLocation +
      "/" +
      checked;
    const data = {
      locationAdvancedLimitsActive: active,
      minMaxQuantityLimitsForProducts: minMaxQuantityLimitsForProducts,
      productListDefaultMinMaxLimit: productListDefaultMinMaxLimit,
      preperationTimeBasedOnProduct: preperationTimeBasedOnProduct,
      productListDefaultProductPreperationTime:
        productListDefaultProductPreperationTime,
      disableProductsForDelivery: disableProductsForDelivery,
      disableProductsForPickup: disableProductsForPickup,
      disableProductsForShipping: disableProductsForShipping,
    };
    const results22 = await axios
      .post(url, data)
      .catch((error) => console.log(error));
    // return thirdResponse;

    return results22;
  }

  return (
    <Frame>
      <Page
        title="Advanced Limits"
        breadcrumbs={[{ content: "Advanced Limits", onAction: redirectToClC }]}
      >
        <PageActions
          primaryAction={{
            content: "Save",
            onAction: async () => {
              const res = await setAdvancedLimitsEdit(
                shopOrigin,
                parsedLocation,
                active,
                checked,
                valueTextFieldMinMaxLimit,
                productListDefaultMinMaxLimit,
                valueTextFieldProductPreperationTime,
                productListDefaultProductPreperationTime,
                alreadySelectedProductsDelivery,
                alreadySelectedProductsPickup,
                alreadySelectedProductsShipping
              );
              if (res.status === 200) {
                setToggleActive(true);
              }
            },
          }}
        />
        <Banner status="info">
          <p>
            Location based features can be used for Methods(Pickup, Delivery,
            Shipping), if you did not activate locations for them, to do that
            please use first location({firstLocation}).
          </p>
        </Banner>
        <br />
        <ResourcePicker
          resourceType="Product"
          showVariants={showVariants}
          selectMultiple={true}
          initialSelectionIds={alreadySelectedProducts}
          open={modal.open}
          onSelection={(resources) => {
            if (isCheckFor === "Delivery") {
              handleSelectionDisableDelivery(resources);
            } else if (isCheckFor === "Pickup") {
              handleSelectionDisablePickup(resources);
            } else if (isCheckFor === "Shipping") {
              handleSelectionDisableShipping(resources);
            } else if (isCheckFor === "productPreperationTime") {
              handleSelectionDayLimit(resources);
            } else if (isCheckFor === "MinMax") {
              handleSelectionMinMaxLimit(resources);
            }
          }}
          onCancel={() => {
            setModal({ open: false });
          }}
        />

        <Layout>
          <Layout.AnnotatedSection title="Active/Deactivate.">
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: () => {
                  setActive((active) => !active);
                },
              }}
              enabled={active}
            >
              Advanced limits for {parsedLocation}{" "}
              <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection>
            <Card>
              <Card.Section>
                <Stack distribution="equalSpacing">
                  <TextStyle variation="strong">
                    Apply changes to the all locations.
                  </TextStyle>
                  <Checkbox checked={checked} onChange={handleChange} />
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Min/Max Limits"
            description="Min and Max Quantity Limits for products to sell on a cart page."
          >
            <Card>
              {emptyStateMinMaxLimit ? (
                <EmptyState
                  heading="Find products to limit for min/max."
                  action={{
                    content: "Select products",
                    onAction: () => {
                      alreadySelectedProducts =
                        alreadySelectedProductsMixMaxLimits;
                      setShowVariants(false);
                      setIsCheckFor("MinMax");
                      setModal({ open: true });
                    },
                  }}
                  image={img}
                ></EmptyState>
              ) : (
                ResourceListMinMaxLimitFunc()
              )}
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Preperation Time Based on Product"
            description="Define preperation time for specific products."
          >
            <Card>
              {emptyStateProductPreperation ? (
                <EmptyState
                  heading="Find products to set preperation time."
                  action={{
                    content: "Select products",
                    onAction: () => {
                      alreadySelectedProducts =
                        alreadySelectedProductsPreperationTime;
                      setShowVariants(false);
                      setIsCheckFor("productPreperationTime");
                      setModal({ open: true });
                    },
                  }}
                  image={img}
                ></EmptyState>
              ) : (
                ResourceListProductPreperationTimeFunc()
              )}
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Disable Products for Pickups"
            description="Disabled products that you do not offer a pickup option."
          >
            <Card>
              <Card.Section>
                <Stack distribution="equalSpacing">
                  <TextStyle variation="positive">
                    Find products to disable for Pickup.
                  </TextStyle>
                  <Button
                    plain={false}
                    primary={true}
                    onClick={() => {
                      alreadySelectedProducts = alreadySelectedProductsPickup;
                      setShowVariants(true);
                      setIsCheckFor("Pickup");
                      setModal({ open: true });
                    }}
                  >
                    Select products
                  </Button>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Disable Products for Delivery"
            description="Disabled products that you do not offer a delivery option."
          >
            <Card>
              <Card.Section>
                <Stack distribution="equalSpacing">
                  <TextStyle variation="positive">
                    Find products to disable for Delivery.
                  </TextStyle>
                  <Button
                    plain={false}
                    primary={true}
                    onClick={() => {
                      alreadySelectedProducts = alreadySelectedProductsDelivery;
                      setShowVariants(true);
                      setIsCheckFor("Delivery");
                      setModal({ open: true });
                    }}
                  >
                    Select products
                  </Button>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Disable Products for Shipping"
            description="Disabled products that you do not offer a shipping option."
          >
            <Card>
              <Card.Section>
                <Stack distribution="equalSpacing">
                  <TextStyle variation="positive">
                    Find products to disable for Shipping.
                  </TextStyle>
                  <Button
                    plain={false}
                    primary={true}
                    onClick={() => {
                      alreadySelectedProducts = alreadySelectedProductsShipping;
                      setShowVariants(true);
                      setIsCheckFor("Shipping");
                      setModal({ open: true });
                    }}
                  >
                    Select products
                  </Button>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        {toastMarkup}
      </Page>
    </Frame>
  );

  // handleSelectionMinMaxLimit

  function handleSelectionMinMaxLimit(resources) {
    try {
      var selectionFromResources = [];
      var productListDefaultMinMaxLimitTemp = [];
      alreadySelectedProductsMixMaxLimits = [];
      resources.selection.map((product) => {
        selectionFromResources = resources.selection;
        productListDefaultMinMaxLimitTemp.push({
          id: product.id,
          title: product.title,
          images: product.images,
        });
        alreadySelectedProductsMixMaxLimits.push({
          id: product.id,
        });
      });

      setModal({ open: false });
      setProductListDefaultMinMaxLimit(productListDefaultMinMaxLimitTemp);

      selectionFromResources.map((item) => {
        setValueTextFieldMinMaxLimit((prevNotes) => {
          if (prevNotes === undefined) {
            return {
              ...prevNotes,
              [item.title]: {
                id: item.id,
                method: "All",
                min: "",
                max: "",
              },
            };
          } else if (!prevNotes.hasOwnProperty(item.title)) {
            return {
              ...prevNotes,
              [item.title]: {
                id: item.id,
                method: "All",
                min: "",
                max: "",
              },
            };
          } else if (prevNotes.hasOwnProperty(item.title)) {
            return {
              ...prevNotes,
            };
          }
        });
      });

      setValueTextFieldMinMaxLimit((prevNotes) => {
        var minMaxObjExtra = [];
        var minMaxObjExtra2 = {};
        Object.keys(prevNotes).map(function (key, index) {
          minMaxObjExtra.push(
            selectionFromResources.filter((item) => key === item.title)
          );
        });
        minMaxObjExtra.map((item) => {
          if (item.length > 0) {
            if (prevNotes.hasOwnProperty(item[0].title)) {
              minMaxObjExtra2[item[0].title] = prevNotes[item[0].title];
            }
          }
        });
        return minMaxObjExtra2;
      });

      setEmptyStateMinMaxLimit(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectionDayLimit(resources) {
    try {
      var selectionFromResources = [];
      var productListDefaultProductPreperationTimeTemp = [];
      alreadySelectedProductsPreperationTime = [];
      resources.selection.map((product) => {
        selectionFromResources = resources.selection;
        productListDefaultProductPreperationTimeTemp.push({
          id: product.id,
          title: product.title,
          images: product.images,
        });
        alreadySelectedProductsPreperationTime.push({
          id: product.id,
        });
      });

      setModal({ open: false });
      setProductListDefaultProductPreperationTime(
        productListDefaultProductPreperationTimeTemp
      );

      selectionFromResources.map((item) => {
        setValueTextFieldProductPreperationTime((prevNotes) => {
          if (prevNotes === undefined) {
            return {
              ...prevNotes,
              [item.title]: {
                id: item.id,
                timingvalue: "1",
                unit: "Minutes",
              },
            };
          } else if (!prevNotes.hasOwnProperty(item.title)) {
            return {
              ...prevNotes,
              [item.title]: {
                id: item.id,
                timingvalue: "1",
                unit: "Minutes",
              },
            };
          } else if (prevNotes.hasOwnProperty(item.title)) {
            return {
              ...prevNotes,
            };
          }
        });
      });

      setValueTextFieldProductPreperationTime((prevNotes) => {
        var preperationTimeObjExtra = [];
        var preperationTimeObjExtra2 = {};
        Object.keys(prevNotes).map(function (key, index) {
          preperationTimeObjExtra.push(
            selectionFromResources.filter((item) => key === item.title)
          );
        });
        preperationTimeObjExtra.map((item) => {
          if (item.length > 0) {
            if (prevNotes.hasOwnProperty(item[0].title)) {
              preperationTimeObjExtra2[item[0].title] =
                prevNotes[item[0].title];
            }
          }
        });
        return preperationTimeObjExtra2;
      });

      setEmptyStateProductPreperation(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectionDisablePickup(resources) {
    try {
      var selectionFromResources2 = [];
      alreadySelectedProductsPickup = [];
      resources.selection.map((product) => {
        var variantsIdArray = [];
        product.variants.map((variants) => {
          selectionFromResources2.push([product, variants]);
          variantsIdArray.push({ id: variants.id });
        });

        alreadySelectedProductsPickup.push({
          id: product.id,
          variants: variantsIdArray,
        });
      });
      setModal({ open: false });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectionDisableDelivery(resources) {
    try {
      var selectionFromResources = [];
      alreadySelectedProductsDelivery = [];
      resources.selection.map((product) => {
        var variantsIdArray = [];
        product.variants.map((variants) => {
          selectionFromResources.push([product, variants]);
          variantsIdArray.push({ id: variants.id });
        });
        alreadySelectedProductsDelivery.push({
          id: product.id,
          variants: variantsIdArray,
        });
      });

      setModal({ open: false });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectionDisableShipping(resources) {
    try {
      var selectionFromResources = [];
      alreadySelectedProductsShipping = [];
      resources.selection.map((product) => {
        var variantsIdArray = [];
        product.variants.map((variants) => {
          selectionFromResources.push([product, variants]);
          variantsIdArray.push({ id: variants.id });
        });
        alreadySelectedProductsShipping.push({
          id: product.id,
          variants: variantsIdArray,
        });
      });

      setModal({ open: false });
    } catch (error) {
      console.log(error);
    }
  }
}

export default advancedlimitsedit;
