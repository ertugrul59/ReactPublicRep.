import react, { useState, useEffect, useCallback } from "react";

import {
  TextStyle,
  Card,
  Page,
  Badge,
  Layout,
  TextField,
  Stack,
  Checkbox,
  RadioButton,
  Select,
  Tabs,
  DatePicker,
  List,
  Subheading,
  Heading,
  PageActions,
  Frame,
  EmptyState,
  Icon,
  Thumbnail,
  ResourceList,
  Button,
  Toast,
  Banner,
  Spinner,
} from "@shopify/polaris";
import tabs from "../components/TabDaysContstant";
import options from "../components/timeoptions";
import ButtonStyleDelete from "../components/ButtonClickDelete";
import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import ButtonStyleGap from "../components/ButtonGapAdd";

import moment from "moment";
import { useAxios } from "../hooks/useAxios";
const queryString = require("query-string");

const todaysMon = parseInt(moment().format("M")) - 1;
const todaysYear = parseInt(moment().format("YYYY"));

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
function rates({ shopOrigin, hosturl }) {
  const [axios] = useAxios();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const [storeNameCNC, setStoreNameCNC] = useState("");
  const [storeAddressCNC, setStoreAddressCNC] = useState("");
  const [aimFor, setAimFor] = useState("");
  const [moneyFormat, setMoneyFormat] = useState("");

  const [ratesObject, setRatesObject] = useState({
    rateName: "",
    rateDescription: "",
    rateBasePrice: "",
    currency: "",
    matchCondition: "Exact",
    ratesCombination: {
      orderPrice: {
        active: false,
        topupFee: "",
        minPrice: "",
        maxPrice: "",
      },
      orderWeight: {
        active: false,
        topupFee: "",
        minWeight: "",
        maxWeight: "",
      },
      orderItemsQuantities: {
        active: false,
        topupFee: "",
        minQuantity: "",
        maxQuantity: "",
      },
      postalcodeZipcode: {
        active: false,
        topupFee: "",
        included: "",
        excluded: "",
      },
      distance: {
        active: false,
        distanceUnit: "Kilometers",
        pricePerUnitDistance: "",
        minDistance: "",
        maxDistance: "",
        distanceCalculation: "Driving route",
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      dateTime: {
        active: false,
        dateArray: [],
        daysOfWeek: {
          Mon: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Tue: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Wed: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Thu: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Fri: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Sat: {
            begins: "",
            ends: "",
            topupFee: "",
          },
          Sun: {
            begins: "",
            ends: "",
            topupFee: "",
          },
        },
      },
      productFeatures: {
        active: false,
        alreadySelectedProducts: [],
        productListDefault: [],
      },
      vendor: {
        active: false,
        vendorArray: [],
      },
    },
  });
  const [allImportantSettingsDontDELETE, setAllImportantSettingsDontDELETE] =
    useState({});

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabString, setSelectedTabString] = useState("Mon");

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
    if (selectedTabIndex === 0) setSelectedTabString("Mon");
    else if (selectedTabIndex === 1) setSelectedTabString("Tue");
    else if (selectedTabIndex === 2) setSelectedTabString("Wed");
    else if (selectedTabIndex === 3) setSelectedTabString("Thu");
    else if (selectedTabIndex === 4) setSelectedTabString("Fri");
    else if (selectedTabIndex === 5) setSelectedTabString("Sat");
    else if (selectedTabIndex === 6) setSelectedTabString("Sun");
  }, []);

  const [allowRangeSelector, setallowRangeSelector] = useState(false);
  const [valuesDateOption, setValuesDateOption] = useState("single");
  const handleChangeRadio = useCallback((_checked, newValue) => {
    setValuesDateOption(newValue);
    if (newValue === "single") {
      setallowRangeSelector(false);
    } else if ("double") {
      setallowRangeSelector(true);
    }
  }, []);

  const [{ month, year }, setDate] = useState({
    month: todaysMon,
    year: todaysYear,
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const [bannerActiveForDistance, setBannerActiveForDistance] = useState(true);

  const [showVariants, setShowVariants] = useState(true);
  const [modal, setModal] = useState({ open: false });
  const [emptyStateProducts, setEmptyStateProducts] = useState(true);

  const [vendorName, setVendorName] = useState("");
  const [vendorFee, setVendorFee] = useState("");
  const [vendorHowMany, setVendorHowMany] = useState("Single");

  const [apiKeyHideShow, setApiKeyHideShow] = useState("Hide");
  const [apiKeyType, setApiKeyType] = useState("password");
  const [apiKeyText, setApiKeyText] = useState("");

  ////////////////////////////////
  const [activeToggle, setToggleActive] = useState(false);
  const toggleActive = useCallback(
    () => setToggleActive((active) => !active),
    []
  );
  const toastMarkup = activeToggle ? (
    <Toast content="Save Success" onDismiss={toggleActive} />
  ) : null;

  //////////////////
  const [activeError, setActiveError] = useState(false);
  const toggleActiveError = useCallback(
    () => setActiveError((active) => !active),
    []
  );
  const toastMarkupError = activeError ? (
    <Toast content="Error" onDismiss={toggleActiveError} error={true} />
  ) : null;
  ////////////////////////////////
  const [currentMethod, setCurrentMethod] = useState("");

  const [bannerActive, setBannerActive] = useState(true);

  async function getInfo(shopOrigin) {
    const url = "/api/location/" + shopOrigin;
    const returndetails = await axios
      .get(url)
      .catch((error) => console.log(error));
    return returndetails;
  }

  useEffect(() => {
    try {
      const parsed = queryString.parse(location.search);
      setStoreNameCNC(parsed.location);
      setStoreAddressCNC(parsed.address);
      setCurrentMethod(parsed.method);
      setAimFor(parsed.aim);

      //
      const merchantinfoUrl =
        "https://" + shopOrigin + "/admin/api/2021-07/shop.json";
      const anyordersUrl = hosturl + "/shopifyorders/getstoreinfo";
      const data = {
        urlToGet: merchantinfoUrl,
      };

      if (parsed.aim === "edit") {
        getInfo(shopOrigin).then((details) => {
          var length = details.data.details.length;
          for (var i = 0; i < length; i++) {
            if (details.data.details[i].locationName === parsed.location) {
              details.data.details[i].locationRates[0][parsed.method].map(
                (selectedRate) => {
                  if (selectedRate.uniqueId.toString() === parsed.uniqueId) {
                    setRatesObject(selectedRate);
                    if (
                      selectedRate.ratesCombination.productFeatures
                        .productListDefault.length > 0
                    ) {
                      setEmptyStateProducts(false);
                    }
                  }
                }
              );
            }
          }
        });
      }

      axios.post(anyordersUrl, data).then((res) => {
        setMoneyFormat(res.data.shop.money_format.slice(0, 1));

        setRatesObject((prevNotes) => {
          prevNotes.currency = res.data.shop.currency;
          return prevNotes;
        });
      });
      ///
    } catch (error) {
      console.log(error);
    }
  }, []);

  const orderPriceFunc = () => {
    if (ratesObject.ratesCombination.orderPrice.active) {
      return (
        <Card.Section>
          <Stack>
            <TextField
              label="Top-up fee"
              placeholder="0"
              value={ratesObject.ratesCombination.orderPrice.topupFee}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderPrice.topupFee = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
          </Stack>
          <br />
          <Stack>
            <TextField
              label="Min Price"
              placeholder="None"
              value={ratesObject.ratesCombination.orderPrice.minPrice}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderPrice.minPrice = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
            <TextField
              label="Max Price"
              placeholder="None"
              value={ratesObject.ratesCombination.orderPrice.maxPrice}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderPrice.maxPrice = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
          </Stack>
        </Card.Section>
      );
    }
  };

  const orderWeightFunc = () => {
    if (ratesObject.ratesCombination.orderWeight.active) {
      return (
        <Card.Section>
          <Stack>
            <TextField
              label="Top-up fee"
              placeholder="0"
              value={ratesObject.ratesCombination.orderWeight.topupFee}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderWeight.topupFee = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
          </Stack>
          <br />
          <Stack>
            <TextField
              label="Min Weight"
              placeholder="None"
              value={ratesObject.ratesCombination.orderWeight.minWeight}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderWeight.minWeight = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={"grams"}
              autoComplete="off"
            />
            <TextField
              label="Max Weight"
              placeholder="None"
              value={ratesObject.ratesCombination.orderWeight.maxWeight}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderWeight.maxWeight = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={"grams"}
              autoComplete="off"
            />
          </Stack>
        </Card.Section>
      );
    }
  };

  const orderQuantityFunc = () => {
    if (ratesObject.ratesCombination.orderItemsQuantities.active) {
      return (
        <Card.Section>
          <Stack>
            <TextField
              label="Top-up fee"
              placeholder="0"
              value={ratesObject.ratesCombination.orderItemsQuantities.topupFee}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderItemsQuantities.topupFee =
                    value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
          </Stack>
          <br />
          <Stack>
            <TextField
              label="Min Quantity"
              placeholder="None"
              value={
                ratesObject.ratesCombination.orderItemsQuantities.minQuantity
              }
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderItemsQuantities.minQuantity =
                    value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              autoComplete="off"
            />
            <TextField
              label="Max Quantity"
              placeholder="None"
              value={
                ratesObject.ratesCombination.orderItemsQuantities.maxQuantity
              }
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.orderItemsQuantities.maxQuantity =
                    value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              autoComplete="off"
            />
          </Stack>
        </Card.Section>
      );
    }
  };

  const zipcodePostcodeFunc = () => {
    if (ratesObject.ratesCombination.postalcodeZipcode.active) {
      return (
        <Card.Section>
          <Stack vertical>
            <TextField
              placeholder="Please add by comma seperated, such as (L23S,3RP,34G,2322)."
              label="Include Postcodes/Zipcodes"
              value={ratesObject.ratesCombination.postalcodeZipcode.included}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.postalcodeZipcode.included = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              multiline={4}
            />
            <TextField
              placeholder="Please add by comma seperated, such as (L23S,3RP,34G,2322)."
              label="Exclude Postcodes/Zipcodes"
              value={ratesObject.ratesCombination.postalcodeZipcode.excluded}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.postalcodeZipcode.excluded = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              multiline={4}
            />
            <Stack distribution="leading">
              <TextField
                label="Top-up fee"
                placeholder="0"
                value={ratesObject.ratesCombination.postalcodeZipcode.topupFee}
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.postalcodeZipcode.topupFee =
                      value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                type="number"
                prefix={moneyFormat}
                autoComplete="off"
              />
            </Stack>
          </Stack>
        </Card.Section>
      );
    }
  };

  const bannerFunctionWarning = () => {
    if (bannerActiveForDistance) {
      return (
        <div>
          <Banner
            title="Please follow setup instructions before using this feature."
            status="warning"
            secondaryAction={{ content: "Learn more", url: "" }}
            onDismiss={() => {
              setBannerActiveForDistance(false);
            }}
          >
            <p>
              This feature requries Google Maps API key. Google provides $200
              free monthly usage (equivalent to 40,000 request).
            </p>
          </Banner>
          <br />
        </div>
      );
    }
  };

  const distanceFunc = () => {
    if (ratesObject.ratesCombination.distance.active) {
      return (
        <Card.Section>
          {bannerFunctionWarning()}
          <Stack>
            <TextField
              label="Google Api key"
              value={apiKeyText}
              onChange={(value, id) => {
                setApiKeyText(value);
                setAllImportantSettingsDontDELETE({});
              }}
              type={apiKeyType}
              autoComplete="off"
              connectedLeft={
                <Select
                  labelHidden
                  options={["Hide", "Show"]}
                  value={apiKeyHideShow}
                  onChange={(value, id) => {
                    if (value === "Hide") {
                      setApiKeyHideShow("Hide");
                      setApiKeyType("password");
                    } else if (value === "Show") {
                      setApiKeyHideShow("Show");
                      setApiKeyType("text");
                    }
                  }}
                />
              }
            />
            <Select
              label="Distance Calculation"
              // labelHidden
              options={["Driving route", "Walking route", "Bicycling route"]}
              value={ratesObject.ratesCombination.distance.distanceCalculation}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.distance.distanceCalculation =
                    value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
            />
          </Stack>
          <br />
          <Card.Section title="Driving Route Restrictions">
            <Stack>
              <Checkbox
                label="Avoid tolls"
                checked={ratesObject.ratesCombination.distance.avoidTolls}
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.distance.avoidTolls = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <Checkbox
                label="Avoid highways"
                checked={ratesObject.ratesCombination.distance.avoidHighways}
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.distance.avoidHighways = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <Checkbox
                label="Avoid ferries"
                checked={ratesObject.ratesCombination.distance.avoidFerries}
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.distance.avoidFerries = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack>
          </Card.Section>
          <br />
          <Stack>
            <TextField
              label="Price per Kilometer/Mile"
              value={ratesObject.ratesCombination.distance.pricePerUnitDistance}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.distance.pricePerUnitDistance =
                    value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
              connectedLeft={
                <Select
                  label="Unit of time"
                  labelHidden
                  options={["Kilometers", "Miles"]}
                  value={ratesObject.ratesCombination.distance.distanceUnit}
                  onChange={(value, id) => {
                    setRatesObject((prevNotes) => {
                      prevNotes.ratesCombination.distance.distanceUnit = value;
                      return prevNotes;
                    });
                    setAllImportantSettingsDontDELETE({});
                  }}
                />
              }
            />
          </Stack>
          <br />
          <Stack>
            <TextField
              placeholder="None"
              label="Min Distance"
              value={ratesObject.ratesCombination.distance.minDistance}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.distance.minDistance = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              autoComplete="off"
            />
            <TextField
              placeholder="None"
              label="Max Distance"
              value={ratesObject.ratesCombination.distance.maxDistance}
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.distance.maxDistance = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              autoComplete="off"
            />
          </Stack>
        </Card.Section>
      );
    }
  };

  function handleAddVendor() {
    setRatesObject((prevNotes) => {
      prevNotes.ratesCombination.vendor.vendorArray.push({
        vendorName: vendorName,
        topupFee: vendorFee,
        vendorHowMany: vendorHowMany,
      });
      return prevNotes;
    });
    setAllImportantSettingsDontDELETE({});
  }

  const listItemsVendor = ratesObject.ratesCombination.vendor.vendorArray.map(
    (item, index) => (
      <div key={item.vendorName}>
        <Stack vertical>
          <List.Item key={item.vendorName}>
            <Heading>{item.vendorName}</Heading>
          </List.Item>
          <Stack alignment="trailing" distribution="leading">
            <TextField
              label="Top-up fee"
              value={
                ratesObject.ratesCombination.vendor.vendorArray[index].topupFee
              }
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.vendor.vendorArray[
                    index
                  ].topupFee = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
            <Stack distribution="leading" alignment="trailing">
              <Select
                label="Charge Type"
                options={["Single", "Multiply"]}
                value={
                  ratesObject.ratesCombination.vendor.vendorArray[index]
                    .vendorHowMany
                }
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.vendor.vendorArray[
                      index
                    ].vendorHowMany = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <ButtonStyleDelete
                setClick={() => {
                  setRatesObject((prevNotes) => {
                    var temporaryarray =
                      ratesObject.ratesCombination.vendor.vendorArray.filter(
                        (items) => items.vendorName !== item.vendorName
                      );
                    prevNotes.ratesCombination.vendor.vendorArray =
                      temporaryarray;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <br />
      </div>
    )
  );

  function handleAddDateTime() {
    // double date
    if (allowRangeSelector) {
      var availableDatesStrings =
        selectedDates.start.toDateString() +
        " - " +
        selectedDates.end.toDateString();
      setRatesObject((prevNotes) => {
        prevNotes.ratesCombination.dateTime.dateArray.push({
          selectedDates: availableDatesStrings,
          topupFee: "",
        });
        return prevNotes;
      });
      setAllImportantSettingsDontDELETE({});
    }
    // single date
    else {
      var availableDatesStrings = selectedDates.start.toDateString();
      setRatesObject((prevNotes) => {
        prevNotes.ratesCombination.dateTime.dateArray.push({
          selectedDates: availableDatesStrings,
          topupFee: "",
        });
        return prevNotes;
      });
      setAllImportantSettingsDontDELETE({});
    }
  }

  const listItemsDate = ratesObject.ratesCombination.dateTime.dateArray.map(
    (item, index) => (
      <div key={item.selectedDates}>
        <Stack vertical>
          <List.Item key={item.selectedDates}>
            <Heading>{item.selectedDates}</Heading>
          </List.Item>
          <Stack alignment="trailing" distribution="leading">
            <TextField
              label="Top-up fee"
              //   placeholder="Daily Delivery"
              value={
                ratesObject.ratesCombination.dateTime.dateArray[index].topupFee
              }
              onChange={(value, id) => {
                setRatesObject((prevNotes) => {
                  prevNotes.ratesCombination.dateTime.dateArray[
                    index
                  ].topupFee = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              type="number"
              prefix={moneyFormat}
              autoComplete="off"
            />
            <ButtonStyleDelete
              setClick={() => {
                setRatesObject((prevNotes) => {
                  var temporaryarray =
                    ratesObject.ratesCombination.dateTime.dateArray.filter(
                      (items) => items.selectedDates !== item.selectedDates
                    );
                  prevNotes.ratesCombination.dateTime.dateArray =
                    temporaryarray;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
            />
          </Stack>
        </Stack>
        <br />
      </div>
    )
  );

  const dateTimeFunc = () => {
    if (ratesObject.ratesCombination.dateTime.active) {
      return (
        <Tabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={handleTabChange}
          fitted
        >
          <Card.Section>
            <Stack distribution="leading" spacing="baseTight">
              <Select
                label="Time Begins"
                value={
                  ratesObject.ratesCombination.dateTime.daysOfWeek[
                    selectedTabString
                  ].begins
                }
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.dateTime.daysOfWeek[
                      selectedTabString
                    ].begins = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                options={options}
              />
              <Select
                label="Time Ends"
                value={
                  ratesObject.ratesCombination.dateTime.daysOfWeek[
                    selectedTabString
                  ].ends
                }
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.dateTime.daysOfWeek[
                      selectedTabString
                    ].ends = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                options={options}
              />
              <TextField
                label="Top-up fee"
                value={
                  ratesObject.ratesCombination.dateTime.daysOfWeek[
                    selectedTabString
                  ].topupFee
                }
                onChange={(value, id) => {
                  setRatesObject((prevNotes) => {
                    prevNotes.ratesCombination.dateTime.daysOfWeek[
                      selectedTabString
                    ].topupFee = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                type="number"
                prefix={moneyFormat}
                autoComplete="off"
              />
            </Stack>
          </Card.Section>
          {/*  */}
          <br />
          <Card.Section>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange={allowRangeSelector}
            />
            <br />
            <br />
            <Card.Section title="Date/s">
              <br />
              <Stack vertical>
                <RadioButton
                  label="Single Date Picker"
                  id="single"
                  name="datepickersingle"
                  checked={valuesDateOption === "single"}
                  onChange={handleChangeRadio}
                />
                <RadioButton
                  label="Date Range Picker"
                  id="double"
                  name="datepickerdouble"
                  checked={valuesDateOption === "double"}
                  onChange={handleChangeRadio}
                />
                <ButtonStyleGap setClick={handleAddDateTime} />
              </Stack>

              <br />
              <br />
              <List type="bullet">{listItemsDate}</List>
            </Card.Section>
          </Card.Section>
          {/*  */}
        </Tabs>
      );
    }
  };

  const ResourceListProducts = () => {
    return (
      <Card.Section>
        <Stack alignment="center" distribution="center">
          <Button
            plain={false}
            primary={true}
            onClick={() => {
              setModal({ open: true });
            }}
          >
            Add product
          </Button>
        </Stack>
        <ResourceList
          showHeader
          resourceName={{ singular: "Product", plural: "Products" }}
          items={
            ratesObject.ratesCombination.productFeatures.productListDefault
          }
          renderItem={(item, index) => {
            const media = (
              <Thumbnail
                source={item.images[0] ? item.images[0].originalSrc : ""}
                alt={item.images[0] ? item.images[0].altText : ""}
              />
            );

            return (
              <ResourceList.Item
                id={index}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <Stack>
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">{item.title}</TextStyle>
                    </h3>
                  </Stack.Item>
                  <Stack alignment="trailing" distribution="trailing">
                    <Stack.Item distribution="trailing">
                      <TextField
                        id={index}
                        label="Top-up fee"
                        type="number"
                        placeholder="None"
                        value={
                          ratesObject.ratesCombination.productFeatures
                            .productListDefault[parseInt(index)]
                            ? ratesObject.ratesCombination.productFeatures
                                .productListDefault[parseInt(index)].topupFee
                            : "0"
                        }
                        onChange={(value, id) => {
                          setRatesObject((prevNotes) => {
                            prevNotes.ratesCombination.productFeatures.productListDefault[
                              parseInt(index)
                            ].topupFee = value;
                            return prevNotes;
                          });
                          setAllImportantSettingsDontDELETE({});
                        }}
                      />
                    </Stack.Item>
                    <Stack.Item distribution="trailing">
                      <Select
                        label="Charge Type"
                        // labelHidden
                        options={["Single", "Multiply"]}
                        value={
                          ratesObject.ratesCombination.productFeatures
                            .productListDefault[parseInt(index)]
                            ? ratesObject.ratesCombination.productFeatures
                                .productListDefault[parseInt(index)].howMany
                            : "Single"
                        }
                        onChange={(value, id) => {
                          setRatesObject((prevNotes) => {
                            prevNotes.ratesCombination.productFeatures.productListDefault[
                              parseInt(index)
                            ].howMany = value;
                            return prevNotes;
                          });
                          setAllImportantSettingsDontDELETE({});
                        }}
                      />
                    </Stack.Item>
                  </Stack>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    );
  };

  const productsWithVariantsFunc = () => {
    if (ratesObject.ratesCombination.productFeatures.active) {
      return (
        <Card>
          <br />
          {emptyStateProducts ? (
            <EmptyState
              heading="Find products/variants to charge right fee."
              action={{
                content: "Select products",
                onAction: () => {
                  setModal({ open: true });
                },
              }}
              image={img}
            ></EmptyState>
          ) : (
            ResourceListProducts()
          )}
          <br />
        </Card>
      );
    }
  };

  const vendorFunc = () => {
    if (ratesObject.ratesCombination.vendor.active) {
      return (
        <Card.Section>
          <Stack fill alignment="trailing" distribution="trailing">
            <Stack.Item distribution="trailing">
              <TextField
                label="Vendor"
                placeholder="Liam Fashions"
                autoComplete="off"
                value={vendorName}
                onChange={(value, id) => {
                  setVendorName(value);
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack.Item>
            {/* <Stack alignment="trailing" distribution="trailing"> */}
            <Stack.Item distribution="trailing">
              <TextField
                label="Top-up fee"
                //   placeholder="Daily Delivery"
                type="number"
                prefix={moneyFormat}
                autoComplete="off"
                value={vendorFee}
                onChange={(value, id) => {
                  setVendorFee(value);
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack.Item>
            <Stack.Item distribution="trailing">
              <Select
                label="Charge Type"
                // labelHidden
                options={["Single", "Multiply"]}
                value={vendorHowMany}
                onChange={(value, id) => {
                  setVendorHowMany(value);
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <ButtonStyleGap setClick={handleAddVendor} />
            </Stack.Item>
            {/* </Stack> */}
          </Stack>
          <br />
          <br />
          <List type="bullet">{listItemsVendor}</List>
        </Card.Section>
      );
    }
  };

  async function setAllFunc(
    shopOrigin,
    storeNameCNC,
    ratesObject,
    currentMethod,
    aimFor
  ) {
    const url = "/api/rates/" + shopOrigin + "/" + storeNameCNC;

    const data = {
      ratesObject: ratesObject,
      currentMethod: currentMethod,
      aimFor: aimFor,
    };
    const res = await axios
      .post(url, data)
      .catch((error) => console.log(error));
    return res;
  }

  const bannerFunc = () => {
    if (bannerActive) {
      return (
        <div>
          <Banner
            title="Custom/Dynamic Rates"
            secondaryAction={{
              content: "Learn more",
              external: true,
              url: "https://help.shopify.com/en/manual/shipping/setting-up-and-managing-your-shipping/enabling-shipping-carriers",
            }}
            status="info"
            onDismiss={() => {
              setBannerActive(false);
            }}
          >
            <p>
              Please make sure, Third-party carrier-calculated shipping rates
              has already activated for your store.
            </p>
          </Banner>
          <br />
          <br />
        </div>
      );
    }
  };

  return (
    <Frame>
      <Page
        breadcrumbs={[
          {
            content: "Back to Rates",
            onAction: () => {
              redirect.dispatch(
                Redirect.Action.APP,
                `/locationsedit?location=${storeNameCNC}&address=${storeAddressCNC}`
              );
            },
          },
        ]}
        title={"Rates"}
        secondaryActions={[]}
      >
        <PageActions
          primaryAction={{
            content: "Save",
            onAction: async () => {
              const res = await setAllFunc(
                shopOrigin,
                storeNameCNC,
                ratesObject,
                currentMethod,
                aimFor
              );
              if (res.status === undefined) {
                setActiveError(true);
              } else if (res.status === 200) {
                setToggleActive(true);
              } else {
                setActiveError(true);
              }
            },
          }}
        />
        {bannerFunc()}

        <ResourcePicker
          resourceType="Product"
          showVariants={showVariants}
          selectMultiple={true}
          initialSelectionIds={
            ratesObject.ratesCombination.productFeatures.alreadySelectedProducts
          }
          open={modal.open}
          onSelection={(resources) => {
            handleSelectionProducts(resources);
          }}
          onCancel={() => {
            setModal({ open: false });
          }}
        />
        <Layout>
          <Layout.AnnotatedSection title="Rate Details">
            <Card>
              <Card.Section>
                <TextField
                  label="Rate Name"
                  placeholder="Daily Delivery"
                  value={ratesObject.rateName}
                  onChange={(value, id) => {
                    setRatesObject((prevNotes) => {
                      prevNotes.rateName = value;
                      return prevNotes;
                    });
                    setAllImportantSettingsDontDELETE({});
                  }}
                  autoComplete="off"
                />
                <br />
                <TextField
                  label="Description"
                  placeholder="Delivery in 2 days"
                  value={ratesObject.rateDescription}
                  onChange={(value, id) => {
                    setRatesObject((prevNotes) => {
                      prevNotes.rateDescription = value;
                      return prevNotes;
                    });
                    setAllImportantSettingsDontDELETE({});
                  }}
                  autoComplete="off"
                />
                <br />
                <TextField
                  label="Base Price"
                  placeholder="10"
                  value={ratesObject.rateBasePrice}
                  onChange={(value, id) => {
                    setRatesObject((prevNotes) => {
                      prevNotes.rateBasePrice = value;
                      return prevNotes;
                    });
                    setAllImportantSettingsDontDELETE({});
                  }}
                  type="number"
                  prefix={moneyFormat}
                  autoComplete="off"
                />
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Add Rates Based on Specific Cases"
            description="This will help you to combine multiple conditions together."
          >
            <Card>
              <Card.Section>
                <Stack vertical>
                  <RadioButton
                    id="Exact"
                    name="Exact Match"
                    label="Exact Match"
                    helpText="All set conditions must match below."
                    checked={ratesObject.matchCondition === "Exact"}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.matchCondition = id;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  <RadioButton
                    id="Partial"
                    name="Partial Match"
                    label="Partial Match"
                    helpText="If some conditions match then will use matched conditions below."
                    checked={ratesObject.matchCondition === "Partial"}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.matchCondition = id;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                </Stack>
              </Card.Section>
              <Card.Section>
                <Stack vertical>
                  <Checkbox
                    label="Order Price"
                    checked={ratesObject.ratesCombination.orderPrice.active}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.orderPrice.active = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {orderPriceFunc()}
                  <Checkbox
                    label="Order Weight"
                    checked={ratesObject.ratesCombination.orderWeight.active}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.orderWeight.active = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {orderWeightFunc()}
                  <Checkbox
                    label="Order Items Quantities"
                    checked={
                      ratesObject.ratesCombination.orderItemsQuantities.active
                    }
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.orderItemsQuantities.active =
                          value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {orderQuantityFunc()}
                  <Checkbox
                    label="Postalcode/Zipcode"
                    checked={
                      ratesObject.ratesCombination.postalcodeZipcode.active
                    }
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.postalcodeZipcode.active =
                          value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {zipcodePostcodeFunc()}

                  <Checkbox
                    label="Date/Time"
                    checked={ratesObject.ratesCombination.dateTime.active}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.dateTime.active = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {dateTimeFunc()}
                  <Checkbox
                    label="Products with variants"
                    checked={
                      ratesObject.ratesCombination.productFeatures.active
                    }
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.productFeatures.active =
                          value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {productsWithVariantsFunc()}
                  <Checkbox
                    label="Vendor"
                    checked={ratesObject.ratesCombination.vendor.active}
                    onChange={(value, id) => {
                      setRatesObject((prevNotes) => {
                        prevNotes.ratesCombination.vendor.active = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  {vendorFunc()}
                </Stack>
              </Card.Section>
            </Card>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Layout.AnnotatedSection>
        </Layout>
        {toastMarkup}
        {toastMarkupError}
      </Page>
    </Frame>
  );

  function handleSelectionProducts(resources) {
    try {
      var productListDefaultTemp = [];
      setRatesObject((prevNotes) => {
        prevNotes.ratesCombination.productFeatures.alreadySelectedProducts = [];
        return prevNotes;
      });
      var sayici = 0;
      resources.selection.map((product) => {
        var variantsIdArray = [];

        product.variants.map((variants) => {
          variantsIdArray.push({ id: variants.id });
          productListDefaultTemp.push({
            id: sayici,
            realId: product.id,
            title: variants.displayName,
            images: product.images,
            topupFee: "0",
            howMany: "Single",
          });
          sayici++;
        });
        setRatesObject((prevNotes) => {
          prevNotes.ratesCombination.productFeatures.alreadySelectedProducts.push(
            {
              id: product.id,
              variants: variantsIdArray,
            }
          );
          return prevNotes;
        });
      });
      setRatesObject((prevNotes) => {
        productListDefaultTemp.map((itemProduct1, index) => {
          prevNotes.ratesCombination.productFeatures.productListDefault.map(
            (itemProduct2) => {
              if (itemProduct1.title === itemProduct2.title) {
                productListDefaultTemp[index].topupFee = itemProduct2.topupFee;
                productListDefaultTemp[index].howMany = itemProduct2.howMany;
              }
            }
          );
        });
        prevNotes.ratesCombination.productFeatures.productListDefault =
          productListDefaultTemp;
        return prevNotes;
      });

      if (productListDefaultTemp.length > 0) {
        setEmptyStateProducts(false);
      } else {
        setEmptyStateProducts(true);
      }

      setModal({ open: false });
    } catch (error) {
      console.log(error);
    }
  }
}

export default rates;
