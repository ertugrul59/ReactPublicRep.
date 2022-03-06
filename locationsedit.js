import react, { useState, useEffect, useCallback } from "react";
import {
  Checkbox,
  Card,
  TextField,
  Select,
  PageActions,
  Layout,
  Heading,
  Tabs,
  Page,
  Banner,
  TextContainer,
  List,
  Thumbnail,
  Stack,
  SettingToggle,
  RadioButton,
  Subheading,
  TextStyle,
  DatePicker,
  Frame,
  FooterHelp,
  Link,
  Toast,
} from "@shopify/polaris";
import tabs from "../components/TabDaysContstant";
import TabMethodsConstant from "../components/TabMethodsConstant";
import ButtonStyleDelete from "../components/ButtonClickDelete";
import ButtonStyleGap from "../components/ButtonGapAdd";
import options from "../components/timeoptions";
import optionsDays from "../components/dayoptions";
import optionsMonths from "../components/monthoptions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import { useAxios } from "../hooks/useAxios";
import moment from "moment";

import { TittleBar } from "../components/TittleBarOptions";
const queryString = require("query-string");

var oneTimeTrue = true;

const todaysMon = parseInt(moment().format("M")) - 1;
const todaysYear = parseInt(moment().format("YYYY"));

function locationsedit({ shopOrigin }) {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [axios] = useAxios();

  TittleBar(app, "locations", "Locations");

  const [allImportantSettingsDontDELETE, setAllImportantSettingsDontDELETE] =
    useState({});
  const [allImportantSettings, setAllImportantSettings] = useState({
    Pickup: {
      activeLocations: false,
    },
    Delivery: {
      activeLocations: false,
    },
    Shipping: {
      activeLocations: false,
    },
    tagOrders: {
      checkedTagLocation: false,
      checkedTagMethod: false,
      checkedTagDate: false,
      checkedTagTime: false,
      checkedTagWeight: false,
      checkedTagPrice: false,
    },
    Location: {
      Pickup: {
        dateTimeOptions: {
          activeDateTime: false,
          valueTimePicker: "datepicker",
          valueCustomOrDefaultTimepicker: "defaultTimepicker",
          defaultTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            blockoutdaystimes: [],
            eachTimeSlot: "00:15",
            pickups: "Unlimited",
          },
          customTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            blockoutdaystimes: [],
          },
          maxDatePickerRange: {
            months: "",
            days: "",
          },
        },
        postcodeCheckerOptions: {
          activePostcodeChecker: false,
          valuePoscodesInclude: "",
          valuePoscodesExclude: "",
        },
      },
      Delivery: {
        dateTimeOptions: {
          activeDateTime: false,
          valueTimePicker: "datepicker",
          valueCustomOrDefaultTimepicker: "defaultTimepicker",
          defaultTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            blockoutdaystimes: [],
            eachTimeSlot: "00:15",
            pickups: "Unlimited",
          },
          customTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            blockoutdaystimes: [],
          },
          maxDatePickerRange: {
            months: "",
            days: "",
          },
        },
        postcodeCheckerOptions: {
          activePostcodeChecker: false,
          valuePoscodesInclude: "",
          valuePoscodesExclude: "",
        },
      },
      Shipping: {
        dateTimeOptions: {
          activeDateTime: false,
          valueTimePicker: "datepicker",
          valueCustomOrDefaultTimepicker: "defaultTimepicker",
          defaultTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              openningTime: "",
              closingTime: "",
              gaps: [],
            },
            blockoutdaystimes: [],
            eachTimeSlot: "00:15",
            pickups: "Unlimited",
          },
          customTimePickerObject: {
            Mon: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Tue: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Wed: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Thu: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Fri: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sat: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            Sun: {
              isDisabled: false,
              preperationDays: "",
              preperationTime: "",
              customlist: [],
            },
            blockoutdaystimes: [],
          },
          maxDatePickerRange: {
            months: "",
            days: "",
          },
        },
        postcodeCheckerOptions: {
          activePostcodeChecker: false,
          valuePoscodesInclude: "",
          valuePoscodesExclude: "",
        },
      },
    },
  });

  const [activationsStatus, setActivationsStatus] = useState({
    Pickup: {
      general: false,
      locationBased: false,
    },
    Delivery: {
      general: false,
      locationBased: false,
    },
    Shipping: {
      general: false,
      locationBased: false,
    },
  });

  const [showRatesObject, setShowRatesObject] = useState({
    Pickup: [],
    Delivery: [],
    Shipping: [],
  });

  //// Tabs Methods

  const [selectedTabMethods, setSelectedTabMethods] = useState(0);
  const [selectedTabMethodsString, setSelectedTabMethodsString] =
    useState("Pickup");

  const handleTabMethodsChange = useCallback((selectedTabIndex) => {
    setSelectedTabMethods(selectedTabIndex);
    if (selectedTabIndex === 0) setSelectedTabMethodsString("Pickup");
    else if (selectedTabIndex === 1) setSelectedTabMethodsString("Delivery");
    else if (selectedTabIndex === 2) setSelectedTabMethodsString("Shipping");
  }, []);

  ///

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

  const optionsEachTimeSlot = [
    // { label: "Select", value: "Select" },
    { label: "15 min", value: "00:15" },
    { label: "30 min", value: "00:30" },
    { label: "1 hour", value: "01:00" },
  ];

  const [selected11, setSelected11] = useState("");
  const [selected12, setSelected12] = useState("");

  const [customSelected1, setCustomSelected1] = useState("");
  const [customSelected2, setCustomSelected2] = useState("");
  const [customLimitSelected3, setCustomLimitSelected3] = useState("");

  const handleCustomChange1 = useCallback(
    (value) => setCustomSelected1(value),
    []
  );

  const handleCustomChange2 = useCallback(
    (value) => setCustomSelected2(value),
    []
  );
  const handleCustomLimitChange3 = useCallback(
    (value) => setCustomLimitSelected3(value),
    []
  );

  const handleSelectChange11 = useCallback((value) => setSelected11(value), []);
  const handleSelectChange12 = useCallback((value) => setSelected12(value), []);

  const [selected5, setSelected5] = useState("");
  const [selected6, setSelected6] = useState("");

  const handleSelectChange5 = useCallback((value) => setSelected5(value), []);
  const handleSelectChange6 = useCallback((value) => setSelected6(value), []);

  const [firstLocationOfMerchant, setFirstLocationOfMerchant] = useState("");
  const [firstLocationAdressOfMerchant, setFirstLocationAdressOfMerchant] =
    useState("");

  function handleAdd() {
    if (
      selected11 === "Select" ||
      selected12 === "Select" ||
      selected11 === "" ||
      selected12 === ""
    ) {
    } else {
      setAllImportantSettings((prevNotes) => {
        var tempprevNotes = prevNotes;
        tempprevNotes.Location[
          selectedTabMethodsString
        ].dateTimeOptions.defaultTimePickerObject[selectedTabString].gaps.push(
          selected11 + "  till  " + selected12
        );
        return tempprevNotes;
      });
      setAllImportantSettingsDontDELETE({});
    }
  }

  const listitems = allImportantSettings.Location[
    selectedTabMethodsString
  ].dateTimeOptions.defaultTimePickerObject[selectedTabString].gaps.map(
    (item) => (
      <div key={item}>
        <Stack>
          <List.Item>{item}</List.Item>
          <ButtonStyleDelete
            setClick={() => {
              setAllImportantSettings((prevNotes) => {
                var temporaryarray = prevNotes.Location[
                  selectedTabMethodsString
                ].dateTimeOptions.defaultTimePickerObject[
                  selectedTabString
                ].gaps.filter((items) => items !== item);
                prevNotes.Location[
                  selectedTabMethodsString
                ].dateTimeOptions.defaultTimePickerObject[
                  selectedTabString
                ].gaps = temporaryarray;
                return prevNotes;
              });
              setAllImportantSettingsDontDELETE({});
            }}
          />
        </Stack>
        <br />
      </div>
    )
  );

  ////

  function customHandleAdd() {
    if (
      customSelected1 === "Select" ||
      customSelected2 === "Select" ||
      customSelected1 === "" ||
      customSelected2 === ""
    ) {
    } else {
      setAllImportantSettings((prevNotes) => {
        var tempprevNotes = prevNotes;
        tempprevNotes.Location[
          selectedTabMethodsString
        ].dateTimeOptions.customTimePickerObject[
          selectedTabString
        ].customlist.push([
          customSelected1,
          customSelected2,
          customLimitSelected3,
        ]);
        return tempprevNotes;
      });
      setAllImportantSettingsDontDELETE({});
    }
  }

  var customlistitems = allImportantSettings.Location[
    selectedTabMethodsString
  ].dateTimeOptions.customTimePickerObject[selectedTabString].customlist.map(
    (item, index) => (
      <div key={index}>
        <Stack>
          <List.Item>
            <Stack alignment="trailing" distribution="center">
              <Select
                id={index.toString()}
                value={item[0]}
                options={options}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    var temporaryarray = prevNotes;
                    temporaryarray.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].customlist[parseInt(id)][0] = value;
                    return temporaryarray;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <Select
                id={index.toString()}
                value={item[1]}
                options={options}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    var temporaryarray = prevNotes;
                    temporaryarray.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].customlist[parseInt(id)][1] = value;
                    return temporaryarray;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <TextField
                id={index.toString()}
                type="number"
                max="10000000"
                min="1"
                placeholder="None"
                value={item[2]}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    var temporaryarray = prevNotes;
                    temporaryarray.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].customlist[parseInt(id)][2] = value;
                    return temporaryarray;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />

              <ButtonStyleDelete
                setClick={() => {
                  setAllImportantSettings((prevNotes) => {
                    var temporaryarray = prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].customlist.filter((items) => items !== item);
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].customlist = temporaryarray;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack>
          </List.Item>
        </Stack>
        <br />
      </div>
    )
  );

  const customlistitemsFunc = () => {
    if (customlistitems.length > 0) {
      return (
        <Card.Section title="Custom Time Slots">
          <br />
          <List type="bullet" key="customlistitems">
            {customlistitems}
          </List>
        </Card.Section>
      );
    }
  };

  // ///////////////////////////
  const [allowRangeSelector, setallowRangeSelector] = useState(false);
  const [valuess, setValuess] = useState("disabled");
  const handleChangeRadio = useCallback((_checked, newValue) => {
    setValuess(newValue);
    if (newValue === "disabled") {
      setallowRangeSelector(false);
    } else {
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

  const defaultTimePickerOrDefaultFunction = () => {
    var valueTimePicker1 =
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueTimePicker;
    var valueCustomOrDefaultTimepicker1 =
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueCustomOrDefaultTimepicker;
    if (
      valueTimePicker1 === "datepicker" ||
      valueTimePicker1 === "daterangepicker" ||
      valueCustomOrDefaultTimepicker1 === "customTimepicker"
    ) {
      return "customTimePickerObject";
    } else if (valueTimePicker1 === "dateandtimepicker") {
      return "defaultTimePickerObject";
    }
  };

  function handleAdd2() {
    var availableDatesStrings = selectedDates.start.toString().slice(0, 15);

    if (allowRangeSelector) {
      availableDatesStrings =
        selectedDates.start.toString().slice(0, 15) +
        " - " +
        selectedDates.end.toString().slice(0, 15);
    }

    if (
      selected5 === "" ||
      selected6 === "" ||
      selected5 === "Select" ||
      selected6 === "Select"
    ) {
      setAllImportantSettings((prevNotes) => {
        prevNotes.Location[selectedTabMethodsString].dateTimeOptions[
          defaultTimePickerOrDefaultFunction()
        ].blockoutdaystimes.push(" => " + availableDatesStrings);
        return prevNotes;
        // return [...prevNotes, " => " + availableDatesStrings];
      });
      setAllImportantSettingsDontDELETE({});
    } else {
      if (
        allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
          .valueCustomOrDefaultTimepicker === "defaultTimepicker"
      ) {
        setAllImportantSettings((prevNotes) => {
          prevNotes.Location[selectedTabMethodsString].dateTimeOptions[
            defaultTimePickerOrDefaultFunction()
          ].blockoutdaystimes.push(
            selected5 + "  till  " + selected6 + " => " + availableDatesStrings
          );
          return prevNotes;
        });
        setAllImportantSettingsDontDELETE({});
      } else if (
        allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
          .valueCustomOrDefaultTimepicker === "customTimepicker"
      ) {
        setAllImportantSettings((prevNotes) => {
          prevNotes.Location[selectedTabMethodsString].dateTimeOptions[
            defaultTimePickerOrDefaultFunction()
          ].blockoutdaystimes.push(" => " + availableDatesStrings);
          return prevNotes;
        });
        setAllImportantSettingsDontDELETE({});
      }
    }
  }

  const listitems2 = allImportantSettings.Location[
    selectedTabMethodsString
  ].dateTimeOptions[defaultTimePickerOrDefaultFunction()].blockoutdaystimes.map(
    (item) => (
      <div key={item}>
        <Stack>
          <List.Item key={item}>{item}</List.Item>
          <ButtonStyleDelete
            setClick={() => {
              setAllImportantSettings((prevNotes) => {
                var temporaryarray = prevNotes.Location[
                  selectedTabMethodsString
                ].dateTimeOptions[
                  defaultTimePickerOrDefaultFunction()
                ].blockoutdaystimes.filter((items) => items !== item);
                prevNotes.Location[selectedTabMethodsString].dateTimeOptions[
                  defaultTimePickerOrDefaultFunction()
                ].blockoutdaystimes = temporaryarray;
                return prevNotes;
              });
              setAllImportantSettingsDontDELETE({});
            }}
          />
        </Stack>
        <br />
      </div>
    )
  );

  async function getInfo(shopOrigin) {
    const url = "/api/location/" + shopOrigin;
    const returndetails = await axios
      .get(url)
      .catch((error) => console.log(error));
    return returndetails;
  }

  const [storeNameCNC, setStoreNameCNC] = useState("");
  const [storeAddressCNC, setStoreAddressCNC] = useState("");

  useEffect(() => {
    try {
      const parsed = queryString.parse(location.search);

      setStoreNameCNC(parsed.location);
      setStoreAddressCNC(parsed.address);

      if (oneTimeTrue) {
        oneTimeTrue = false;
        var valueTimePicker1;
        var valueCustomOrDefaultTimepicker1;
        getInfo(shopOrigin).then((details) => {
          // console.log("details.data", details.data);
          ///
          setActivationsStatus((prevNotes) => {
            prevNotes["Pickup"].general = details.data.generalPickup;
            prevNotes["Delivery"].general = details.data.generalDelivery;
            prevNotes["Shipping"].general = details.data.generalShipping;
            return prevNotes;
          });

          ///
          var length = details.data.details.length;

          setFirstLocationOfMerchant(details.data.details[0].locationName);
          setFirstLocationAdressOfMerchant(details.data.details[0].address);
          for (var i = 0; i < length; i++) {
            if (details.data.details[i].locationName === parsed.location) {
              if (details.data.details[i].locationRates !== undefined) {
                setShowRatesObject(details.data.details[i].locationRates[0]);
              }

              setActivationsStatus((prevNotes) => {
                prevNotes["Pickup"].locationBased =
                  details.data.details[i]["Pickup"].active;
                prevNotes["Delivery"].locationBased =
                  details.data.details[i]["Delivery"].active;
                prevNotes["Shipping"].locationBased =
                  details.data.details[i]["Shipping"].active;
                return prevNotes;
              });

              setAllImportantSettings((prevNotes) => {
                var temp = prevNotes;
                temp.Pickup = details.data.Pickup;
                temp.Delivery = details.data.Delivery;
                temp.Shipping = details.data.Shipping;
                temp.tagOrders = details.data.tagOrders;

                temp.Location =
                  details.data.details[i].allImportantSettingsLocation[0];
                return temp;
              });
            }
            if (length - 1 === i) {
              setAllImportantSettingsDontDELETE({});
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isDisabledFuncCustom = (isDisabled) => {
    if (!isDisabled) {
      return (
        <div>
          <Card.Section title="Preperation Time/Cut-off time">
            <br />
            <Stack spacing="tight" distribution="leading">
              <Select
                label="Day"
                options={optionsDays}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].preperationDays = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.customTimePickerObject[selectedTabString]
                    .preperationDays
                }
              />
              <Select
                label="Time"
                options={options}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.customTimePickerObject[
                      selectedTabString
                    ].preperationTime = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.customTimePickerObject[selectedTabString]
                    .preperationTime
                }
              />
            </Stack>
            <br />
          </Card.Section>
          <br />
          {/* //// */}
          <Card.Section>
            <Stack alignment="trailing" distribution="fillEvenly">
              <Select
                label="Begins"
                options={options}
                onChange={handleCustomChange1}
                value={customSelected1}
              />
              <Select
                label="Ends"
                options={options}
                onChange={handleCustomChange2}
                value={customSelected2}
              />
              <TextField
                label="Limit"
                type="number"
                max="10000000"
                min="1"
                placeholder="None"
                value={customLimitSelected3}
                onChange={handleCustomLimitChange3}
              />
              <ButtonStyleGap setClick={customHandleAdd} />
            </Stack>
            <br />
            {customlistitemsFunc()}
          </Card.Section>
        </div>
      );
    }
  };

  const timePickerTypeFunction = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueCustomOrDefaultTimepicker === "defaultTimepicker"
    ) {
      return (
        <Tabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={handleTabChange}
          fitted
        >
          <br />
          <Card.Section>
            {businessScheduleFunc(tabs[selectedTab].content)}
          </Card.Section>
        </Tabs>
      );
    } else if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueCustomOrDefaultTimepicker === "customTimepicker"
    ) {
      return (
        <Tabs
          tabs={tabs}
          selected={selectedTab}
          onSelect={handleTabChange}
          fitted
        >
          <br />
          {isDisabledFuncCustom(
            allImportantSettings.Location[selectedTabMethodsString]
              .dateTimeOptions.customTimePickerObject[selectedTabString]
              .isDisabled
          )}
        </Tabs>
      );
    }
  };

  const isDisabledFuncDefault = () => {
    return (
      <Card.Section>
        <Checkbox
          label={"Permanently disable " + tabs[selectedTab].realName}
          checked={
            allImportantSettings.Location[selectedTabMethodsString]
              .dateTimeOptions.defaultTimePickerObject[selectedTabString]
              .isDisabled
          }
          onChange={(value, id) => {
            setAllImportantSettings((prevNotes) => {
              prevNotes.Location[
                selectedTabMethodsString
              ].dateTimeOptions.defaultTimePickerObject[
                selectedTabString
              ].isDisabled = value;
              return prevNotes;
            });
            setAllImportantSettingsDontDELETE({});
          }}
        />
      </Card.Section>
    );
  };

  const businessScheduleFunc = (day) => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .defaultTimePickerObject[selectedTabString].isDisabled
    ) {
      return isDisabledFuncDefault();
    } else {
      return (
        <div>
          {isDisabledFuncDefault()}
          <Card.Section title="Preperation Time/Cut-off time">
            <br />
            <Stack spacing="tight" distribution="leading">
              <Select
                label="Day"
                options={optionsDays}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.defaultTimePickerObject[
                      selectedTabString
                    ].preperationDays = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.defaultTimePickerObject[selectedTabString]
                    .preperationDays
                }
              />
              <Select
                label="Time"
                options={options}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.defaultTimePickerObject[
                      selectedTabString
                    ].preperationTime = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.defaultTimePickerObject[selectedTabString]
                    .preperationTime
                }
              />
            </Stack>
            <br />
          </Card.Section>
          <br />
          <Stack distribution="fill">
            <Select
              label="Openning Time"
              options={options}
              onChange={(value, id) => {
                setAllImportantSettings((prevNotes) => {
                  prevNotes.Location[
                    selectedTabMethodsString
                  ].dateTimeOptions.defaultTimePickerObject[
                    selectedTabString
                  ].openningTime = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              value={
                allImportantSettings.Location[selectedTabMethodsString]
                  .dateTimeOptions.defaultTimePickerObject[selectedTabString]
                  .openningTime
              }
            />
            <Select
              label="Closing Time"
              options={options}
              // onChange={handleSelectChange2}
              onChange={(value, id) => {
                setAllImportantSettings((prevNotes) => {
                  prevNotes.Location[
                    selectedTabMethodsString
                  ].dateTimeOptions.defaultTimePickerObject[
                    selectedTabString
                  ].closingTime = value;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              }}
              value={
                allImportantSettings.Location[selectedTabMethodsString]
                  .dateTimeOptions.defaultTimePickerObject[selectedTabString]
                  .closingTime
              }
            />
          </Stack>
          <br />
          <Card.Section title="Gaps">
            <br />
            <Stack distribution="fill">
              <Select
                // label="Start"
                options={options}
                onChange={handleSelectChange11}
                value={selected11}
              />
              <Select
                // label="Finish"
                options={options}
                onChange={handleSelectChange12}
                value={selected12}
              />
              {/* <Button>Add</Button> */}
              <ButtonStyleGap setClick={handleAdd} />
            </Stack>
            <br />
            <List type="bullet" key={listitems}>
              {listitems}
            </List>
          </Card.Section>
          <br />
          <br />
          <Card.Section title="-Each Time Slot and Limits-">
            <br />
            <Stack distribution="fill">
              <Select
                label="Each Time Slot"
                options={optionsEachTimeSlot}
                // onChange={handleSelectChange3}
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.defaultTimePickerObject.eachTimeSlot = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.defaultTimePickerObject.eachTimeSlot
                }
              />
              <TextField
                label="Pickups"
                type="number"
                max="100000"
                min="1"
                placeholder="None"
                onChange={(value, id) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.defaultTimePickerObject.pickups = value;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
                value={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.defaultTimePickerObject.pickups
                }
              />
            </Stack>
          </Card.Section>
        </div>
      );
    }
  };

  const redirectToClC = useCallback(
    () => redirect.dispatch(Redirect.Action.APP, "/locations"),
    []
  );

  const isDatePickerDisabledDaysOfTheWeekFunc = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueTimePicker === "datepicker" ||
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueTimePicker === "daterangepicker"
    ) {
      return (
        <Layout.AnnotatedSection
          title="Business Schedule"
          description="Disable day/s of the week."
        >
          <Card sectioned>
            <Tabs
              tabs={tabs}
              selected={selectedTab}
              onSelect={handleTabChange}
              fitted
            >
              <br />
              <Card.Section>
                <Checkbox
                  label={"Permanently disable " + tabs[selectedTab].realName}
                  checked={
                    allImportantSettings.Location[selectedTabMethodsString]
                      .dateTimeOptions.customTimePickerObject[selectedTabString]
                      .isDisabled
                  }
                  onChange={(value, id) => {
                    setAllImportantSettings((prevNotes) => {
                      prevNotes.Location[
                        selectedTabMethodsString
                      ].dateTimeOptions.customTimePickerObject[
                        selectedTabString
                      ].isDisabled = value;
                      return prevNotes;
                    });
                    setAllImportantSettingsDontDELETE({});
                  }}
                />
              </Card.Section>
              <Card.Section title="Preperation Time/Cut-off time">
                <br />
                <Stack spacing="tight" distribution="leading">
                  <Select
                    label="Day"
                    options={optionsDays}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.customTimePickerObject[
                          selectedTabString
                        ].preperationDays = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                    value={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.customTimePickerObject[
                        selectedTabString
                      ].preperationDays
                    }
                  />
                </Stack>
              </Card.Section>
            </Tabs>
          </Card>
        </Layout.AnnotatedSection>
      );
    }
  };

  const isDateAndTimePickerFunc = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueTimePicker === "dateandtimepicker"
    ) {
      return (
        <Layout.AnnotatedSection
          title="Business Schedule"
          description="Please specify Time Picker type and set timeslots."
        >
          <Card sectioned>
            {/* <FittedTabsClCEdit /> */}
            <Stack vertical>
              <RadioButton
                label="Default Time Picker"
                helpText="You can choose 15min/30min/1hour timeslots with time picker."
                checked={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.valueCustomOrDefaultTimepicker ===
                  "defaultTimepicker"
                }
                id="defaultTimepicker"
                name="defaultTimepicker"
                onChange={(_checked, newValue) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.valueCustomOrDefaultTimepicker = newValue;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
              <RadioButton
                label="Custom Time Picker"
                helpText="You can define customizable timeslots with time picker."
                checked={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .dateTimeOptions.valueCustomOrDefaultTimepicker ===
                  "customTimepicker"
                }
                id="customTimepicker"
                name="customTimepicker"
                onChange={(_checked, newValue) => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.valueCustomOrDefaultTimepicker = newValue;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                }}
              />
            </Stack>
            <br />
            <br />
            {timePickerTypeFunction()}
          </Card>
        </Layout.AnnotatedSection>
      );
    }
  };

  const showTimeBlockerFunc = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueTimePicker === "dateandtimepicker" &&
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .valueCustomOrDefaultTimepicker === "defaultTimepicker"
    ) {
      return (
        <div>
          <Stack distribution="fill">
            <Select
              options={options}
              onChange={handleSelectChange5}
              value={selected5}
            />
            <Select
              options={options}
              onChange={handleSelectChange6}
              value={selected6}
            />
          </Stack>
        </div>
      );
    }
  };

  const contentStatusLocations = allImportantSettings[selectedTabMethodsString]
    .activeLocations
    ? "Deactivate"
    : "Activate";
  const textStatusLocations = allImportantSettings[selectedTabMethodsString]
    .activeLocations
    ? "activated"
    : "deactivated";

  const contentStatusLocationActive = activationsStatus[
    selectedTabMethodsString
  ].locationBased
    ? "Deactivate"
    : "Activate";
  const textStatusLocationActive = activationsStatus[selectedTabMethodsString]
    .locationBased
    ? "activated"
    : "deactivated";

  const contentStatusForAllLocations = activationsStatus[
    selectedTabMethodsString
  ].general
    ? "Deactivate"
    : "Activate";
  const textStatusForAllLocations = activationsStatus[selectedTabMethodsString]
    .general
    ? "activated"
    : "deactivated";

  const contentStatusDateTime = allImportantSettings.Location[
    selectedTabMethodsString
  ].dateTimeOptions.activeDateTime
    ? "Deactivate"
    : "Activate";
  const textStatusDateTime = allImportantSettings.Location[
    selectedTabMethodsString
  ].dateTimeOptions.activeDateTime
    ? "activated"
    : "deactivated";

  const contentStatusPostcodeChecker = allImportantSettings.Location[
    selectedTabMethodsString
  ].postcodeCheckerOptions.activePostcodeChecker
    ? "Deactivate"
    : "Activate";
  const textStatusPostcodeChecker = allImportantSettings.Location[
    selectedTabMethodsString
  ].postcodeCheckerOptions.activePostcodeChecker
    ? "activated"
    : "deactivated";

  const timesettingsactiveFunc = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString].dateTimeOptions
        .activeDateTime
    ) {
      return (
        <div>
          <Layout.AnnotatedSection
            title="Date and Time Picker Settings"
            description="Based on business type for specific location."
          >
            <Card>
              <Card.Section>
                <Stack vertical>
                  <RadioButton
                    label="Date picker"
                    helpText="Customers will be able to see the date picker."
                    checked={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.valueTimePicker === "datepicker"
                    }
                    id="datepicker"
                    name="datepicker"
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.valueTimePicker = id;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  <RadioButton
                    label="Date & Time picker"
                    helpText="Customers will be able to see date and time pickers."
                    id="dateandtimepicker"
                    name="dateandtimepicker"
                    checked={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.valueTimePicker === "dateandtimepicker"
                    }
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.valueTimePicker = id;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  <RadioButton
                    label="Date Range picker"
                    helpText="Customers will be able to see date range picker."
                    id="daterangepicker"
                    name="daterangepicker"
                    checked={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.valueTimePicker === "daterangepicker"
                    }
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.valueTimePicker = id;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          {isDatePickerDisabledDaysOfTheWeekFunc()}
          {isDateAndTimePickerFunc()}
          {/* /// */}

          <Layout.AnnotatedSection
            title="Max Date Picker Range"
            description="This will help you to set max range for date picker."
          >
            <Card>
              <Card.Section title="Set Max Date Range">
                <br />
                {/* <Stack spacing="tight" distribution="leading"> */}
                <Stack distribution="fillEvenly">
                  <Select
                    label="Month/s"
                    options={optionsMonths}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.maxDatePickerRange.months = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                    value={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.maxDatePickerRange.months
                    }
                  />
                  <Select
                    label="Day/s"
                    options={optionsDays}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.Location[
                          selectedTabMethodsString
                        ].dateTimeOptions.maxDatePickerRange.days = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                    value={
                      allImportantSettings.Location[selectedTabMethodsString]
                        .dateTimeOptions.maxDatePickerRange.days
                    }
                  />
                </Stack>
                <br />
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          {/* /// */}
          <Layout.AnnotatedSection
            title="Additional Restricted(Blockout) Days and Times"
            description="This feature is available without touching general settings, so can be removed."
          >
            <Card sectioned>
              <br />
              <br />
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
                    checked={valuess === "disabled"}
                    id="disabled"
                    name="accounts"
                    onChange={handleChangeRadio}
                  />
                  <RadioButton
                    label="Date Range Picker"
                    id="optional"
                    name="accounts"
                    checked={valuess === "optional"}
                    onChange={handleChangeRadio}
                  />
                  <ButtonStyleGap setClick={handleAdd2} />
                </Stack>
                <br />
                {showTimeBlockerFunc()}
                <br />
                <br />
                <List type="bullet">{listitems2}</List>
              </Card.Section>
            </Card>
            <br />
            <br />
          </Layout.AnnotatedSection>
        </div>
      );
    }
  };

  const activePoscodeFunc = () => {
    if (
      allImportantSettings.Location[selectedTabMethodsString]
        .postcodeCheckerOptions.activePostcodeChecker
    ) {
      return (
        <div>
          <TextField
            placeholder="Please add by comma seperated, such as (L23S,3RP,34G)."
            label="Include Postcodes/Zipcodes starts with"
            value={
              allImportantSettings.Location[selectedTabMethodsString]
                .postcodeCheckerOptions.valuePoscodesInclude
            }
            onChange={(value, id) => {
              setAllImportantSettings((prevNotes) => {
                prevNotes.Location[
                  selectedTabMethodsString
                ].postcodeCheckerOptions.valuePoscodesInclude = value;
                return prevNotes;
              });
              setAllImportantSettingsDontDELETE({});
            }}
            multiline={4}
          />
          <br />
          <TextField
            placeholder="Please add by comma seperated, such as (L23S,3RP,34G)."
            label="Exclude Postcodes/Zipcodes starts with"
            value={
              allImportantSettings.Location[selectedTabMethodsString]
                .postcodeCheckerOptions.valuePoscodesExclude
            }
            onChange={(value, id) => {
              setAllImportantSettings((prevNotes) => {
                prevNotes.Location[
                  selectedTabMethodsString
                ].postcodeCheckerOptions.valuePoscodesExclude = value;
                return prevNotes;
              });
              setAllImportantSettingsDontDELETE({});
            }}
            multiline={4}
          />
        </div>
      );
    }
  };

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

  async function setAllimportantsettingsFunc(
    shopOrigin,
    storeNameCNC,
    allImportantSettings,
    activationsStatus
  ) {
    const url =
      "/api/allimportantsettingsroute/" + shopOrigin + "/" + storeNameCNC;
    const data = {
      allImportantSettings: allImportantSettings,
      activationsStatus: activationsStatus,
    };
    const res = await axios
      .post(url, data)
      .catch((error) => console.log(error));
    return res;
  }

  async function setAllFunc(
    shopOrigin,
    storeNameCNC,
    showRatesObject,
    aimFor,
    allImportantSettings
  ) {
    const url = "/api/rates/" + shopOrigin + "/" + storeNameCNC;
    const data = {
      ratesObject: showRatesObject,
      currentMethod: "none",
      aimFor: aimFor,
      allImportantSettings: allImportantSettings,
    };
    const res = await axios
      .post(url, data)
      .catch((error) => console.log(error));
    return res;
  }

  const locationsActivateFunc = () => {
    var helperTextForLocation = "";
    if (allImportantSettings[selectedTabMethodsString].activeLocations) {
      helperTextForLocation = storeNameCNC;
      return (
        <Layout.AnnotatedSection
          title="Activate Location"
          description={
            "This feature activates/deactivates current Location for " +
            selectedTabMethodsString +
            " method."
          }
        >
          <SettingToggle
            action={{
              content: contentStatusLocationActive,
              onAction: () => {
                setActivationsStatus((prevNotes) => {
                  prevNotes[selectedTabMethodsString].locationBased =
                    !prevNotes[selectedTabMethodsString].locationBased;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              },
            }}
            enabled={activationsStatus[selectedTabMethodsString].locationBased}
          >
            {helperTextForLocation}{" "}
            <TextStyle variation="strong">{textStatusLocationActive}</TextStyle>{" "}
            for {selectedTabMethodsString}.
          </SettingToggle>
        </Layout.AnnotatedSection>
      );
    } else {
      helperTextForLocation = selectedTabMethodsString + " Button ";
      return (
        <Layout.AnnotatedSection title={"Activate " + selectedTabMethodsString}>
          <SettingToggle
            action={{
              content: contentStatusForAllLocations,
              onAction: () => {
                setActivationsStatus((prevNotes) => {
                  prevNotes[selectedTabMethodsString].general =
                    !prevNotes[selectedTabMethodsString].general;
                  return prevNotes;
                });
                setAllImportantSettingsDontDELETE({});
              },
            }}
            enabled={activationsStatus[selectedTabMethodsString].general}
          >
            {helperTextForLocation}
            <TextStyle variation="strong">{textStatusLocationActive}</TextStyle>
          </SettingToggle>
        </Layout.AnnotatedSection>
      );
    }
  };

  const showRatesFunc = showRatesObject[selectedTabMethodsString].map(
    (rateInfo) => (
      <Card.Section
        key={rateInfo.rateName}
        actions={[
          {
            content: "Delete",
            destructive: true,
            onAction: () => {
              setShowRatesObject((prevNotes) => {
                var temporaryarray = prevNotes[selectedTabMethodsString].filter(
                  (items) => items.rateName !== rateInfo.rateName
                );
                prevNotes[selectedTabMethodsString] = temporaryarray;
                return prevNotes;
              });
              setAllImportantSettingsDontDELETE({});
            },
          },
          {
            content: "Edit",
            onAction: () => {
              redirect.dispatch(
                Redirect.Action.APP,
                `/rates?location=${storeNameCNC}&address=${storeAddressCNC}&method=${selectedTabMethodsString}&aim=edit&ratename=${rateInfo.rateName}&uniqueId=${rateInfo.uniqueId}`
              );
            },
          },
        ]}
      >
        <Stack>
          <Stack alignment="center">
            <TextStyle variation="positive">Rate name: </TextStyle>
            <p>{rateInfo.rateName}</p>
          </Stack>
          <Stack alignment="center">
            <TextStyle variation="positive">Rate base fee: </TextStyle>
            <p>{rateInfo.rateBasePrice}</p>
          </Stack>
        </Stack>
      </Card.Section>
    )
  );

  const functionIsLocationsActive = () => {
    if (
      allImportantSettings[selectedTabMethodsString].activeLocations ||
      firstLocationOfMerchant === storeNameCNC
    ) {
      return (
        <div>
          {locationsActivateFunc()}
          <Layout.AnnotatedSection
            title="Date/TimePicker"
            description={
              "If you would like to use date or date time picker for " +
              selectedTabMethodsString +
              "."
            }
          >
            <SettingToggle
              action={{
                content: contentStatusDateTime,
                onAction: () => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes.Location[
                      selectedTabMethodsString
                    ].dateTimeOptions.activeDateTime =
                      !prevNotes.Location[selectedTabMethodsString]
                        .dateTimeOptions.activeDateTime;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                },
              }}
              enabled={
                allImportantSettings.Location[selectedTabMethodsString]
                  .dateTimeOptions.activeDateTime
              }
            >
              Date/TimePicker{" "}
              <TextStyle variation="strong">{textStatusDateTime}</TextStyle> for{" "}
              {selectedTabMethodsString}.
            </SettingToggle>
          </Layout.AnnotatedSection>
          {timesettingsactiveFunc()}

          {/* //// */}
          <Layout.AnnotatedSection
            title="Postcode/Zipcode Checker"
            description={
              "Postcode/Zipcode checker helps customers if they are aligble for " +
              selectedTabMethodsString +
              " before go to checkout, and prevents additional workload."
            }
          >
            {/* <Card> */}
            <Stack vertical spacing="tight">
              <SettingToggle
                action={{
                  content: contentStatusPostcodeChecker,
                  onAction: () => {
                    setAllImportantSettings((prevNotes) => {
                      prevNotes.Location[
                        selectedTabMethodsString
                      ].postcodeCheckerOptions.activePostcodeChecker =
                        !prevNotes.Location[selectedTabMethodsString]
                          .postcodeCheckerOptions.activePostcodeChecker;
                      return prevNotes;
                    });

                    setAllImportantSettingsDontDELETE({});
                  },
                }}
                enabled={
                  allImportantSettings.Location[selectedTabMethodsString]
                    .postcodeCheckerOptions.activePostcodeChecker
                }
              >
                Postcode/Zipcode{" "}
                <TextStyle variation="strong">
                  {textStatusPostcodeChecker}
                </TextStyle>{" "}
                for {selectedTabMethodsString}.
              </SettingToggle>

              {activePoscodeFunc()}
            </Stack>

            {/* </Card> */}
          </Layout.AnnotatedSection>
          {/*  */}
          <Layout.AnnotatedSection
            title="Rates"
            description={
              "Rates will provide you to charge your customers right fees at checkout for " +
              selectedTabMethodsString
            }
          >
            <Card
              title="Active Rates"
              actions={[
                {
                  content: "Add new rate",
                  onAction: () => {
                    redirect.dispatch(
                      Redirect.Action.APP,
                      `/rates?location=${storeNameCNC}&address=${storeAddressCNC}&method=${selectedTabMethodsString}&aim=new`
                    );
                  },
                },
              ]}
            >
              <br />

              {showRatesFunc}
            </Card>
          </Layout.AnnotatedSection>

          {/*  */}
          <Layout.AnnotatedSection
            title="Tag Orders"
            description="Tag orders based on order location, method(pickup/delivery/shipping), date/time, this feature affects all locations. ✨"
          >
            <Card>
              <Card.Section>
                <Stack vertical>
                  <Checkbox
                    label="Location"
                    checked={allImportantSettings.tagOrders.checkedTagLocation}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.tagOrders.checkedTagLocation = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  <Checkbox
                    label="Order Pickup/Delivery/Shipping Method"
                    checked={allImportantSettings.tagOrders.checkedTagMethod}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.tagOrders.checkedTagMethod = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                  <Checkbox
                    label="Order Date/Time"
                    checked={allImportantSettings.tagOrders.checkedTagDate}
                    onChange={(value, id) => {
                      setAllImportantSettings((prevNotes) => {
                        prevNotes.tagOrders.checkedTagDate = value;
                        return prevNotes;
                      });
                      setAllImportantSettingsDontDELETE({});
                    }}
                  />
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </div>
      );
    } else {
      const returnFirstLocationURL = `/locationsedit?location=${firstLocationOfMerchant}&address=${firstLocationAdressOfMerchant}`;
      return (
        <Layout.AnnotatedSection>
          <Card>
            <FooterHelp>
              Please go to the First Location(
              <Link
                external={false}
                onClick={() => {
                  redirect.dispatch(
                    Redirect.Action.APP,
                    returnFirstLocationURL
                  );
                }}
              >
                {firstLocationOfMerchant}
              </Link>
              ) to make changes.
            </FooterHelp>
          </Card>
        </Layout.AnnotatedSection>
      );
    }
  };

  return (
    <Frame>
      <Page
        breadcrumbs={[{ content: "Locations", onAction: redirectToClC }]}
        title="Location Settings"
      >
        <PageActions
          primaryAction={{
            content: "Save",
            onAction: async () => {
              const res = await setAllimportantsettingsFunc(
                shopOrigin,
                storeNameCNC,
                allImportantSettings,
                activationsStatus
              );
              const res2 = await setAllFunc(
                shopOrigin,
                storeNameCNC,
                showRatesObject,
                "save",
                allImportantSettings
              );

              if (res === undefined || res2 === undefined) {
                setActiveError(true);
              } else if (res.status === 200 && res2.status === 200) {
                setToggleActive(true);
              } else {
                setActiveError(true);
              }
            },
          }}
        />

        <Layout>
          <Layout.AnnotatedSection title="Active Store">
            <Card>
              <Card.Section>
                <Stack alignment="center">
                  <Thumbnail
                    source="https://cdn.shopify.com/s/files/1/0550/0891/9758/files/icons8-shop-location-64.png?v=1621978365"
                    alt="Black orange scarf"
                  />
                  <TextContainer spacing="tight">
                    <Heading>{storeNameCNC}</Heading>
                    <p>{storeAddressCNC}</p>
                  </TextContainer>
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection>
            <Tabs
              tabs={TabMethodsConstant}
              selected={selectedTabMethods}
              onSelect={handleTabMethodsChange}
              fitted
            ></Tabs>
            <br />
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Location/s"
            description={
              `If you would like to let customers to be able to select location/s for ` +
              selectedTabMethodsString +
              `, this feature affects all locations. ✨`
            }
          >
            <SettingToggle
              action={{
                content: contentStatusLocations,
                onAction: () => {
                  setAllImportantSettings((prevNotes) => {
                    prevNotes[selectedTabMethodsString].activeLocations =
                      !prevNotes[selectedTabMethodsString].activeLocations;
                    return prevNotes;
                  });
                  setAllImportantSettingsDontDELETE({});
                },
              }}
              enabled={
                allImportantSettings[selectedTabMethodsString].activeLocations
              }
            >
              Locations{" "}
              <TextStyle variation="strong">{textStatusLocations}</TextStyle>{" "}
              for {selectedTabMethodsString}.
            </SettingToggle>
          </Layout.AnnotatedSection>

          {functionIsLocationsActive()}
        </Layout>
        {toastMarkup}
        {toastMarkupError}
      </Page>
    </Frame>
  );
}

export default locationsedit;
