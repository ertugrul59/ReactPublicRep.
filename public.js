const shop = Shopify.shop;

if (shop === undefined) {
  shop = shop;
}

const appdomain = "https://1szzw.sse.codesandbox.io";
var token;
var drops = "down";
var isAppend = false;
var formUseThis;
var marginbodystyle = "margin-bottom: 110px;";

// Load a script from given `url`
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;

    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

const loadLink = (src) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.onload = resolve;
    link.onerror = reject;
    link.src = src;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  });
};

loadScript("https://momentjs.com/downloads/moment-with-locales.min.js")
  .then(() =>
    loadScript(
      "https://momentjs.com/downloads/moment-timezone-with-data-10-year-range.js"
    )
  )

  .then(() => loadScript(appdomain + "/popper.min.js"))
  .then(() => loadScript(appdomain + "/bootstrap.min.js"))
  .then(() => loadScript(appdomain + "/daterangepicker.js"))
  .then(() => loadScript(appdomain + "/teststyles.css"))
  .then(() => {
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = appdomain + "/bootstrap-spinner.css";
    head.appendChild(link);
  })

  .then(() => {
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = appdomain + "/daterangepicker.css";
    head.appendChild(link);

    async function getCartJs() {
      const returncart = await axios.get("/cart.js", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return returncart;
    }
    var body;

    const currentTheme = Shopify.theme.name;
    ///Debut theme
    if (currentTheme === "Debut") {
      // ___1____
      if ($(".cart__shipping.rte").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart__shipping.rte");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }
    ///Simple theme
    else if (currentTheme === "Simple") {
      // ___2____
      if ($(".cart__policies.txt--emphasis.rte").length > 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            ////
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            body = $(".cart__policies.txt--emphasis.rte");
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }
    // Express theme
    else if (currentTheme === "Express") {
      // ___3____
      if ($(".cart__totals").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart__totals");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);

            wholefunctionisHere(body);
          }
        });
      }
      // Card Drawer for Express theme

      if ($(".cart-drawer__tuning").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart-drawer__items");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }

    // Minimal theme
    else if (currentTheme === "Minimal") {
      // ___4____
      if ($(".cart__row").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart__policies");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }
    // Supply theme
    else if (currentTheme === "Supply") {
      // ___5____
      drops = "up";
      formUseThis = $("form.cart-form");
      if ($(".cart-row").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart__policies");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      } else if ($(".header-cart-btn").length !== 0) {
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            $(".header-cart-btn").on("click", function (event) {
              if ($("#pickup-app").length === 0) {
                token = responseCart.data.token;
                const deleteroute =
                  "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
                axios.delete(deleteroute);
              }
            });
            // mobile nav bar
            $(".cart-toggle.mobileNavBar-link").on("click", function (event) {
              if ($("#pickup-app").length === 0) {
                event.preventDefault();
                token = responseCart.data.token;
                const deleteroute =
                  "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
                axios.delete(deleteroute);
              }
            });
          }
        });
      }
    }

    // Brooklyn theme
    else if (currentTheme === "Brooklyn") {
      // ___6____
      if ($(".cart__row").length !== 0) {
        formUseThis = $("form.cart");
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".rte");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }

    // Boundless theme
    else if (currentTheme === "Boundless") {
      getCartJs().then((responseCart) => {
        if (
          responseCart.data.items.length > 0 &&
          responseCart.data.items !== undefined &&
          responseCart.data.items !== null
        ) {
          token = responseCart.data.token;
          const deleteroute =
            "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
          axios.delete(deleteroute);
          // /cart page
          if ($(".txt--minor.txt--emphasis.cart__policies.rte").length > 0) {
            body = $(".txt--minor.txt--emphasis.cart__policies.rte");
            formUseThis = $("form.cart");
            if ($("#pickup-app").length === 0) {
              wholefunctionisHere(body);
            }
          }

          //////////////////////////// //Main and other pages
          const mainNode = document.getElementById("CartDrawer");
          function callback(mutationsList, observer) {
            mutationsList.forEach((mutation) => {
              if (mutation.attributeName === "class") {
                somethingchangedforclass();
              }
            });
          }
          const mutationObserver = new MutationObserver(callback);
          mutationObserver.observe(mainNode, { attributes: true });

          function somethingchangedforclass() {
            var timingCount = 100;
            reRunThisToCheck();

            function reRunThisToCheck() {
              if (timingCount < 3000) {
                timingCount = timingCount + 100;
                setTimeout(functionwaittorun, 100);
              }
            }
            function functionwaittorun() {
              const urlforredirect =
                "https://" + shop + "/cart/update?return_to=/cart";
              $("form.cart.ajaxcart").attr("action", urlforredirect);
              reRunThisToCheck();
            }
          }
        }
      });
    }

    // // Venture theme
    else if (currentTheme === "Venture") {
      // ___8____
      if ($(".cart__row.responsive-table__row").length !== 0) {
        formUseThis = $("form.cart");
        getCartJs().then((responseCart) => {
          if (
            responseCart.data.items.length > 0 &&
            responseCart.data.items !== undefined &&
            responseCart.data.items !== null
          ) {
            body = $(".cart__taxes.rte");
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute);
            wholefunctionisHere(body);
          }
        });
      }
    }

    // // Narrative theme
    else if (currentTheme === "Narrative") {
      // ___9____
      getCartJs().then((responseCart) => {
        if (
          responseCart.data.items.length > 0 &&
          responseCart.data.items !== undefined &&
          responseCart.data.items !== null
        ) {
          token = responseCart.data.token;
          const deleteroute =
            "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
          axios.delete(deleteroute);
          if ($(".cart-item").length > 0) {
            body = $(".cart-policies.text-small.rte");
            formUseThis = $("form.cart__form");
            wholefunctionisHere(body);
          } else if ($(".cart-drawer__item").length > 0) {
            //Drawer works fine
            marginbodystyle = "margin-bottom: 30px;";
            body = $(".cart-drawer__disclaimer.rte");
            formUseThis = $("form.cart-drawer");
            drops = "up";
            wholefunctionisHere(body);
          }
        }
      });
    }

    // // Dawn theme
    else if (currentTheme === "Dawn") {
      // ___10____
      getCartJs().then((responseCart) => {
        if (
          responseCart.data.items.length > 0 &&
          responseCart.data.items !== undefined &&
          responseCart.data.items !== null
        ) {
          ////////////////////////////

          token = responseCart.data.token;
          const deleteroute =
            // appdomain +
            // "/api/delete/orderaddpertimeslot/" +
            "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
          axios.delete(deleteroute);
          if ($(".cart-item").length > 0) {
            body = $(".tax-note.caption-large.rte");
            formUseThis = $("form.cart__contents.critical-hidden");
            wholefunctionisHere(body);
          }
        }
      });
    }

    function wholefunctionisHere(body) {
      const mainbody = $(
        `
            <div id="pickup-app" class="arrange" style= "display: flex; flex-direction: column; ` +
          marginbodystyle +
          ` margin-top: 30px;  text-align: left; width: 100%; ">
          <div class="appsettings1" style="width: 100%; text-align: center; margin: 0; padding: 0; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-evenly;">
        </div>
        </div>
    
              `
      );

      const deliverybutton = $(`                  
    <div class="delivery-button app-button-settings">
    <img src="https://cdn.shopify.com/s/files/1/0550/0891/9758/files/parcel.png?v=1620899861" class="delivery-icon" style="
    width: 40px;
    height: 40px;
    margin-top: 7px;
    margin-bottom: 7px;
    position: relative;
    top: 12px;
    border: 0;">
    <p class="app-button-text delivery-text">Delivery</p>
  </div>`);

      const pickupbutton = $(`        
               
     <div class="pickup-button app-button-settings">
    <img src="https://cdn.shopify.com/s/files/1/0550/0891/9758/files/icons8-shop-100_a8d6e1de-1de6-4789-b5b3-be3705cc73e1.png?v=1629714357" class="pickup-icon" style="
    width: 40px;
    height: 40px;
    margin-top: 7px;
    margin-bottom: 7px;
    position: relative;
    top: 12px;
    border: 0;">
    <p class="app-button-text pickup-text">Pick Up</p>
    </div>`);

      const pickupNoteForCustomers = $(
        `
        <p class="pickup_note_for_custmrs" style="padding: 20px;display: block;margin-bottom: 0px;"></p>    
                  
        `
      );

      const pickupInformPleaseSelectLocation = $(
        `
        <p class="pickup_note" style="padding: 20px;display: block;margin-bottom: 0px;"></p>    
                  
        `
      );

      const errorForPickupAndDelivery = $(
        `
        <p class="errorForPickupAndDelivery" style="padding: 10px; color: #c00;">Please Select Delivery or PickUp Option</p>

        `
      );

      const errorForSelectPickupDateorTime = $(
        `
        <p class="errorForPickup" style="padding: 10px; color: #c00;">Please Select PickUp Date</p>
  
        `
      );

      const pickUpLocations = $(
        `
          <div class="locations">
        
          </div>
          `
      );

      const spinner = $(
        `
          <div class="text-center-spinner" style="padding: 25px;">
          <div class="spinner-border" style="width: 4rem; height: 4rem;"></div>
          </div>
          `
      );

      const calendar = $(
        `
        <div class="calendarclasshere" style="margin-top: 3rem; background: fff; border: 1px solid #aaa; border-radius: 5px;">
        <input type="text" id="thistimepicker" value="Please add your time" style="display: flex; margin-bottom: 0px; flex-direction: column; width: -webkit-fill-available;" readonly  name="datetimes" />
      
                  
        </div>
        `
      );

      if (isAppend) {
        body.append(mainbody);
      } else {
        body.after(mainbody);
      }

      const mainbodyselector = $(".appsettings1");
      const mainbodyselector2 = $(".arrange");
      var newLocation;
      const requestPath1 = "/apps/ertu/location/" + shop;
      var locations = [];
      var unavailable = [];
      var unavailableweeks = [];
      var customerinfo = [];
      var storetimezoneArray = [];
      var storelocaleArray = [];
      var responseLengh;
      var locationstextsize;
      var fontfamilylocations;
      var hsla1;
      var eachTimeSlotarray = [];
      var pickupsarray = [];
      var dateortimepickerArray = [];
      var datePickerDefaultText;
      var pickupInformPleaseSelectLocationText;
      var ApplyLabelText;
      var CancelLabelText;
      var daysOfWeek = [];
      var monthNames = [];
      var inStoreProductid;
      var locationInfoArray = [];
      var isDisabledDaysOfWeekArray = [];
      axios.get(requestPath1).then((response) => {
        var locationName;
        var address;
        var city;
        var country;
        var postcode;
        var isLocationActive;
        var activeteit;
        var ischecked;
        var aa = 0;
        var blockoutDays = [];
        var mon = [];
        var tue = [];
        var wed = [];
        var thu = [];
        var fri = [];
        var sat = [];
        var sun = [];
        var customerinfofield;
        var storetimezone;
        var storelocale;
        inStoreProductid = response.data.inStoreProductid;
        const pickuptext = response.data.PickupButtonText;
        const deliverytext = response.data.DeliveryButtonText;
        datePickerDefaultText = response.data.DatePickerDefaultText;
        const ErrorPickupAndDelivery = response.data.ErrorPickupAndDelivery;
        const ErrorPickup = response.data.ErrorPickup;

        ApplyLabelText = response.data.ApplyLabelText;
        CancelLabelText = response.data.CancelLabelText;
        pickupInformPleaseSelectLocationText =
          response.data.pickupInformPleaseSelectLocation;

        const Mo = response.data.Mo;
        const Tu = response.data.Tu;
        const We = response.data.We;
        const Th = response.data.Th;
        const Fr = response.data.Fr;
        const Sa = response.data.Sa;
        const Su = response.data.Su;
        const January = response.data.January;
        const February = response.data.February;
        const March = response.data.March;
        const April = response.data.April;
        const May = response.data.May;
        const June = response.data.June;
        const July = response.data.July;
        const August = response.data.August;
        const September = response.data.September;
        const October = response.data.October;
        const November = response.data.November;
        const December = response.data.December;
        keepOrdersPerTimeSlot = response.data.keepOrdersPerTimeSlot;

        daysOfWeek.push(Su, Mo, Tu, We, Th, Fr, Sa);
        monthNames.push(
          January,
          February,
          March,
          April,
          May,
          June,
          July,
          August,
          September,
          October,
          November,
          December
        );

        var buttonstextsize = response.data.buttonstextsize;
        locationstextsize = response.data.locationstextsize;
        var fontfamilybuttons = response.data.fontfamilybuttons;
        fontfamilylocations = response.data.fontfamilylocations;

        var hue_textcolor = response.data.textcolor.hue;
        var saturation_textcolor = response.data.textcolor.saturation;
        var brightness_textcolor = response.data.textcolor.brightness;
        var alpha_textcolor = response.data.textcolor.alpha;

        var backgroundcolor = response.data.backgroundcolor;

        var backgroundcolor_hue = backgroundcolor.hue;
        var backgroundcolor_saturation = backgroundcolor.saturation;
        var backgroundcolor_brightness = backgroundcolor.brightness;
        var backgroundcolor_alpha = backgroundcolor.alpha;

        var deliveryIconLink = response.data.deliveryIconLink;
        var pickupIconLink = response.data.pickupIconLink;

        var hue = hue_textcolor.toFixed();
        var saturation = (saturation_textcolor * 100).toFixed();
        var brightness = (brightness_textcolor * 100).toFixed();
        var alpha = (alpha_textcolor * 100).toFixed();

        const hsla =
          "hsl(" +
          hue +
          "deg " +
          saturation +
          "% " +
          brightness +
          "% / " +
          alpha +
          "%)";

        var hue1 = backgroundcolor_hue.toFixed();
        var saturation1 = (backgroundcolor_saturation * 100).toFixed();
        var brightness1 = (backgroundcolor_brightness * 100).toFixed();
        var alpha1 = (backgroundcolor_alpha * 100).toFixed();

        hsla1 =
          "hsl(" +
          hue1 +
          "deg " +
          saturation1 +
          "% " +
          brightness1 +
          "% / " +
          alpha1 +
          "%)";

        var generalDelivery = response.data.generalDelivery;

        responseLengh = response.data.details.length;
        for (var i = 0; i < responseLengh; i++) {
          locationName = response.data.details[i].locationName;
          address = response.data.details[i].address;
          city = response.data.details[i].city;
          country = response.data.details[i].country;
          postcode = response.data.details[i].postcode;
          isLocationActive = response.data.details[i].pickUpActive;

          blockoutDays =
            response.data.details[i].clickandcollect[0].blockoutDays;

          mon = response.data.details[i].clickandcollect[0].mon;
          tue = response.data.details[i].clickandcollect[0].tue;
          wed = response.data.details[i].clickandcollect[0].wed;
          thu = response.data.details[i].clickandcollect[0].mon;
          fri = response.data.details[i].clickandcollect[0].fri;
          sat = response.data.details[i].clickandcollect[0].sat;
          sun = response.data.details[i].clickandcollect[0].sun;

          customerinfofield = response.data.details[i].customerinfo;
          storetimezone = response.data.details[i].storetimezone;
          storelocale = response.data.details[i].storelocale;

          if (
            locationName === "empty" ||
            locationName === null ||
            locationName === undefined
          ) {
            locationName = "";
          }
          if (
            address === "empty" ||
            address === null ||
            address === undefined
          ) {
            address = "";
          }
          if (city === "empty" || city === null || city === undefined) {
            city = "</br>";
          }
          if (
            country === "empty" ||
            country === null ||
            country === undefined
          ) {
            country = "";
          }
          if (
            postcode === "empty" ||
            postcode === null ||
            postcode === undefined
          ) {
            postcode = "";
          }

          if (i !== responseLengh - 1) {
            $(".locations").append(spinner);
          } else {
            $(".text-center-spinner").remove();
          }

          if (isLocationActive) {
            isDisabledDaysOfWeekArray.push({
              Mon: mon[0].isDisabled,
              Tue: tue[0].isDisabled,
              Wed: wed[0].isDisabled,
              Thu: thu[0].isDisabled,
              Fri: fri[0].isDisabled,
              Sat: sat[0].isDisabled,
              Sun: sun[0].isDisabled,
            });
            locationInfoArray.push({
              locationName: locationName,
              address: address,
              city: city,
              country: country,
              postcode: postcode,
            });
            storelocaleArray.push(storelocale);
            storetimezoneArray.push(storetimezone);
            customerinfo.push(customerinfofield);
            unavailable.push(blockoutDays);
            unavailableweeks.push([mon, tue, wed, thu, fri, sat, sun]);
            if (aa === 0) {
              activeteit = "activeteit";
              ischecked = "checked";
            } else {
              activeteit = "";
              ischecked = "";
            }

            newLocation = $(
              `
                
                <div id="${aa}" for="${aa}" class="location ${activeteit}">
                <span id="${aa}" class="blocklocation">
                <span id="${aa}" class="name" style="
                padding-bottom: 1em;
                text-align: left;
            "><strong id="${aa}">${locationName}</strong></span>
                <span id="${aa}" class="address">${address} ${city} ${country} </br> </br> ${postcode}</span>
                
             </div>
           
                `
            );

            aa++;
          }

          if (isLocationActive) {
            locations.push(newLocation);
            eachTimeSlotarray.push(
              response.data.details[i].clickandcollect[0].timeSlots[0]
                .eachTimeSlot
            );
            pickupsarray.push(
              response.data.details[i].clickandcollect[0].timeSlots[0].pickups
            );
            dateortimepickerArray.push(
              response.data.details[i].dateortimepicker
            );
          }
        }

        if (generalDelivery && locations.length > 0) {
          mainbodyselector.append(deliverybutton);
          mainbodyselector.append(pickupbutton);
          mainbodyselector2.append(pickupNoteForCustomers);
          mainbodyselector2.append(pickupInformPleaseSelectLocation);
          mainbodyselector2.append(pickUpLocations);
          mainbodyselector2.append(calendar);
          mainbodyselector2.append(errorForSelectPickupDateorTime);
          calendar.hide();
          pickUpLocations.hide();
          pickupNoteForCustomers.hide();
          pickupInformPleaseSelectLocation.hide();
          errorForPickupAndDelivery.hide();

          errorForSelectPickupDateorTime.hide();

          $(".errorForPickupAndDelivery").text(ErrorPickupAndDelivery);
        } else if (generalDelivery) {
          mainbodyselector.append(deliverybutton);
        } else if (locations.length > 0) {
          mainbodyselector.append(pickupbutton);
          mainbodyselector2.append(pickupNoteForCustomers);
          mainbodyselector2.append(pickupInformPleaseSelectLocation);
          mainbodyselector2.append(pickUpLocations);
          mainbodyselector2.append(calendar);
          mainbodyselector2.append(errorForSelectPickupDateorTime);
          calendar.hide();
          pickUpLocations.hide();
          pickupNoteForCustomers.hide();
          pickupInformPleaseSelectLocation.hide();
          errorForPickupAndDelivery.hide();
          errorForSelectPickupDateorTime.hide();
        } else if (locations.length === 0 && !generalDelivery) {
          selected = true;
        }

        $(".delivery-text").text(deliverytext);
        $(".pickup-text").text(pickuptext);
        $('input[name="datetimes"]').attr("value", datePickerDefaultText);

        $(".errorForPickup").text(ErrorPickup);
        $(".delivery-icon").attr("src", deliveryIconLink);
        $(".pickup-icon").attr("src", pickupIconLink);
        $(".app-button-text").css({
          "font-size": buttonstextsize,
          "font-family": fontfamilybuttons,
          color: hsla,
        });

        $(".app-button-settings").css({
          "border-radius": "5px",
          border: "1px solid #eee",
          // "background-color": "#fff",
          display: "inline-block",
          "flex-grow": "1",
          "flex-basis": "0",
          padding: "0",
          margin: "0 9px 0 0",
          cursor: "pointer",
        });

        locations.map((location) => {
          $(".locations").append(location);
        });

        $("#pickup-app  .locations").css({
          border: "1px solid #dadada",
          "border-radius": "4px",
          "margin-top": ".5em",
          "max-height": "240px",
          "overflow-y": "auto",
        });

        $("#pickup-app .locations .location").css({
          padding: "1em",
          display: "flex",
          "line-height": "0.4em",
          "border-bottom": "1px solid #f3f3f3",
          "margin-bottom": "0",
          "align-items": "flex-start",
        });

        $("#pickup-app .locations .location.activeteit").css({
          background: "#eee",
        });

        $("#pickup-app .locations .location input[type=radio]").css({
          "margin-top": ".2em",
          "margin-right": ".7em",
          height: "inherit",
        });

        $("#pickup-app .locations .location .blocklocation").css({
          display: "flex",
          "flex-direction": "column",
        });

        locations.map((location) => {
          if (location.hasClass("activeteit")) {
            console.log("eachTimeSlotarray", eachTimeSlotarray[0]);
            arrangeTiming(
              unavailable[0],
              unavailableweeks[0],
              eachTimeSlotarray[0],
              pickupsarray[0],
              dateortimepickerArray[0],
              storetimezoneArray[0],
              storelocaleArray[0],
              isDisabledDaysOfWeekArray[0]
            );
            pickupNoteForCustomers.append(
              "<p class=notesinfo>" + customerinfo[0] + "</p>"
            );
            pickupInformPleaseSelectLocation.append(
              "<p class=notesinfo>" +
                pickupInformPleaseSelectLocationText +
                "</p>"
            );

            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios.delete(deleteroute).then((response) => {
              console.log(response);
            });
          }

          location.click(function (event) {
            event.preventDefault();
            var current = $(".activeteit");
            current[0].className = current[0].className.replace(
              " activeteit",
              ""
            );

            this.className += " activeteit";
            if (location.hasClass("activeteit")) {
              location.css({
                background: "#eee",
              });
              $(".notesinfo").remove();
              if (customerinfo[event.target.id] !== "") {
                pickupNoteForCustomers.append(
                  "<p class=notesinfo>" + customerinfo[event.target.id] + "</p>"
                );
              }
              pickupInformPleaseSelectLocation.append(
                "<p class=notesinfo>" +
                  pickupInformPleaseSelectLocationText +
                  "</p>"
              );

              arrangeTiming(
                unavailable[event.target.id],
                unavailableweeks[event.target.id],
                eachTimeSlotarray[event.target.id],
                pickupsarray[event.target.id],
                dateortimepickerArray[event.target.id],
                storetimezoneArray[event.target.id],
                storelocaleArray[event.target.id],
                isDisabledDaysOfWeekArray[event.target.id]
              );

              const deleteroute =
                "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
              axios.delete(deleteroute);
              locations.map((location) => {
                if (!location.hasClass("activeteit")) {
                  location.css({
                    background: "#fff",
                  });
                }
              });
            }
          });
        });
      });

      function arrangeTiming(
        n,
        weeks,
        eachTimeSlot,
        pickups,
        dateortimepicker,
        storetimezoneValue,
        storelocaleValue,
        isDisabledDaysOfWeek
      ) {
        var unavailabledates = [];
        var eachTimeSlotNew = eachTimeSlot.slice(3, 5);
        var unavailabledatesWithTime = [];
        var isInvalidDate = [];
        var indexNumber;
        var linecizgi;
        var raw;
        var day;
        var month;
        var year;
        var editedDate;
        var i = 0;
        if (n !== undefined) {
          n.map((n) => {
            var disabletimeMin1;
            var disabletimeHour1;
            var disabletimeHour1indexNumber;

            var disabletimeMin2;
            var disabletimeHour2;
            var disabletimeHour2indexNumber;

            n = n.toString();

            if (n !== "") {
              if (n.search(":") !== -1) {
                disabletimeHour1indexNumber = n.search(":");
                disabletimeHour1 = n.slice(0, disabletimeHour1indexNumber);
                disabletimeMin1 = n.slice(
                  disabletimeHour1indexNumber + 1,
                  disabletimeHour1indexNumber + 3
                );
                disabletimeHour2indexNumber = n.search("till ");
                disabletimeHour2 = n.slice(
                  disabletimeHour2indexNumber + 6,
                  disabletimeHour2indexNumber + 8
                );
                disabletimeMin2 = n.slice(
                  disabletimeHour2indexNumber + 9,
                  disabletimeHour2indexNumber + 11
                );
              }
              indexNumber = n.search("> ");
              linecizgi = n.search("-");
              if (linecizgi === -1) {
                var toplam = [];
                raw = n.slice(indexNumber + 6);
                day = raw.slice(4, 6);
                month = raw.slice(0, 3);
                year = raw.slice(7);
                month = convertdays(month);
                editedDate = day + "." + month + "." + year;
                toplam = [
                  editedDate,
                  disabletimeHour1,
                  disabletimeMin1,
                  disabletimeHour2,
                  disabletimeMin2,
                ];

                unavailabledates.push(editedDate);
                unavailabledatesWithTime.push(toplam);
              } else {
                raw = n.slice(indexNumber + 6);
                day = raw.slice(4, 6);
                month = raw.slice(0, 3);
                year = raw.slice(7, 11);
                var indexNumber2 = n.search("-");
                var raw2 = n.slice(indexNumber2 + 6);
                var day2 = raw2.slice(4, 6);
                var month2 = raw2.slice(0, 3);
                var year2 = raw2.slice(7, 11);
                month = convertdays(month);
                month2 = convertdays(month2);
                editedDate = day + "." + month + "." + year;
                editedDate2 = day2 + "." + month2 + "." + year2;

                const dates = getDates(
                  new Date(parseInt(year), parseInt(month - 1), parseInt(day)),
                  new Date(
                    parseInt(year2),
                    parseInt(month2 - 1),
                    parseInt(day2)
                  )
                );

                var dayNew;
                var monthNew;
                var yearNew;
                var editedDateNew;

                dates.map((date) => {
                  var toplam = [];
                  dayNew = date.toString().slice(8, 10);
                  monthNew = date.toString().slice(4, 7);
                  yearNew = date.toString().slice(11, 15);
                  monthNew = convertdays(monthNew);
                  editedDateNew = dayNew + "." + monthNew + "." + yearNew;
                  toplam = [
                    editedDateNew,
                    disabletimeHour1,
                    disabletimeMin1,
                    disabletimeHour2,
                    disabletimeMin2,
                  ];
                  unavailabledates.push(editedDateNew);
                  unavailabledatesWithTime.push(toplam);
                });
              }
            }
            i++;
          });

          for (var i = 0; i < unavailabledatesWithTime.length; i++) {
            if (
              unavailabledatesWithTime[i][1] === undefined ||
              unavailabledatesWithTime[i][2] === undefined ||
              unavailabledatesWithTime[i][3] === undefined ||
              unavailabledatesWithTime[i][4] === undefined
            ) {
              isInvalidDate.push(unavailabledatesWithTime[i][0]);
            }
          }

          dateAndTime(
            unavailabledates,
            unavailabledatesWithTime,
            isInvalidDate,
            weeks,
            eachTimeSlotNew,
            pickups,
            dateortimepicker,
            storetimezoneValue,
            storelocaleValue,
            isDisabledDaysOfWeek
          );
        }
      }

      function convertdays(month) {
        if ("Jan" === month) return "01";
        if ("Feb" === month) return "02";
        if ("Mar" === month) return "03";
        if ("Apr" === month) return "04";
        if ("May" === month) return "05";
        if ("Jun" === month) return "06";
        if ("Jul" === month) return "07";
        if ("Aug" === month) return "08";
        if ("Sep" === month) return "09";
        if ("Oct" === month) return "10";
        if ("Nov" === month) return "11";
        if ("Dec" === month) return "12";
      }

      // Returns an array of dates between the two dates
      function getDates(startDate, endDate) {
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days) {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      }

      function cleanUpForPickups(time) {
        var yearClean = time.slice(0, 10);
        var mounthClean = time.slice(13);
        var hourClean = mounthClean.slice(0, 2);
        var minClean = mounthClean.slice(3);

        return [yearClean, hourClean, minClean, hourClean, minClean];
      }

      function dateAndTime(
        unavailabledates,
        unavailabledatesWithTime222,
        isInvalidDate,
        weeks,
        eachTimeSlotNew,
        pickups,
        dateortimepicker,
        storetimezoneValue,
        storelocaleValue,
        isDisabledDaysOfWeek
      ) {
        var unavailabledatesWithTime11 = unavailabledatesWithTime222;
        var dateortimepickerBoolean;

        if (dateortimepicker === "datepicker") {
          dateortimepickerBoolean = false;
        } else if (dateortimepicker === "dateandtimepicker") {
          dateortimepickerBoolean = true;
        }

        var eachTimeSlotinNumber;
        if (eachTimeSlotNew === "00") {
          eachTimeSlotinNumber = 60;
        } else if (eachTimeSlotNew === "15") {
          eachTimeSlotinNumber = 15;
        } else if (eachTimeSlotNew === "30") {
          eachTimeSlotinNumber = 30;
        }

        var datafromorderaddpertimeslot = [];
        var arraymapfiltered = [];
        const requestPath2 = "/apps/ertu/orderaddpertimeslot/" + shop;

        axios.get(requestPath2).then((response2) => {
          if (pickups === undefined || pickups === "Unlimited") {
            daterangepickerRun(unavailabledatesWithTime222);
          } else {
            var locationNamefirst22;
            locations.map((location) => {
              if (location.hasClass("activeteit")) {
                locationNamefirst22 =
                  location.find("span.name")[0].children[0].innerText;
              }
            });

            if (response2.data.length > 0) {
              response2.data.map((item) => {
                if (locationNamefirst22 === item.location) {
                  datafromorderaddpertimeslot.push(item.Date);
                }
              });

              arraymapfiltered = datafromorderaddpertimeslot.reduce(
                (cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt),
                {}
              );

              for (let x in arraymapfiltered) {
                if (arraymapfiltered[x] >= pickups) {
                  unavailabledatesWithTime11.push(cleanUpForPickups(x));
                }
              }
              daterangepickerRun(unavailabledatesWithTime11);
            } else {
              daterangepickerRun(unavailabledatesWithTime11);
            }
          }

          function daterangepickerRun(unavailabledatesWithTime11aa) {
            $('input[name="datetimes"]').attr("value", datePickerDefaultText);
            $('input[name="datetimes"]').daterangepicker(
              {
                autoUpdateInput: false,
                opens: "right",
                drops: drops,
                singleDatePicker: true,
                timePicker: dateortimepickerBoolean,
                timePicker24Hour: true,
                limitpickups: pickups,
                isDisabledDaysOfWeek: isDisabledDaysOfWeek,
                startDate:
                  moment().tz(storetimezoneValue).add(1, "days").format("DD") +
                  "/" +
                  moment().tz(storetimezoneValue).add(1, "days").format("MM") +
                  "/" +
                  moment().tz(storetimezoneValue).format("YYYY"),

                minDate:
                  moment().tz(storetimezoneValue).add(1, "days").format("DD") +
                  "/" +
                  moment().tz(storetimezoneValue).add(1, "days").format("MM") +
                  "/" +
                  moment().tz(storetimezoneValue).format("YYYY"),

                maxDate: moment().tz(storetimezoneValue).add({
                  years: 0,
                  months: 2,
                }),

                timePickerIncrement: eachTimeSlotinNumber,

                unavailabledatesWithTime: unavailabledatesWithTime11aa,
                unavailableWeekDays: weeks,
                isInvalidDate1: isInvalidDate,
                locale: {
                  format: "DD.MM.YYYY",
                  applyLabel: ApplyLabelText,
                  cancelLabel: CancelLabelText,
                  daysOfWeek: daysOfWeek,
                  monthNames: monthNames,
                  firstDay: 1, // fist day of the week made monday
                },

                isInvalidDateValue: function (date) {
                  return !!(
                    unavailabledates.indexOf(date.format("DD.MM.YYYY")) > -1
                  );
                },
              },
              function (start, end, label) {
                if (dateortimepickerBoolean) {
                  if (
                    $(".selectdefaulthour").is(":checked") &&
                    $(".selectdefaultmin").is(":checked")
                  ) {
                    $('input[name="datetimes"]').attr(
                      "value",
                      datePickerDefaultText
                    );
                  } else {
                    $('input[name="datetimes"]').attr(
                      "value",
                      start.locale(storelocaleValue).format("lll")
                    );
                    errorForSelectPickupDateorTime.hide();
                    locations.map((location) => {
                      if (location.hasClass("activeteit")) {
                        var locationNamefirst =
                          location.find("span.name")[0].children[0].innerText;
                        if (pickups === undefined || pickups === "Unlimited") {
                          cartUpdateFunc(
                            locationNamefirst,
                            start.format("DD.MM.YYYY - HH:mm"),
                            start.format()
                          );
                        } else {
                          checkreturnForPickup(
                            locationNamefirst,
                            pickups,
                            unavailabledatesWithTime11aa,
                            start.format("DD.MM.YYYY - HH:mm")
                          );
                        }

                        function checkreturnForPickup(
                          locationNamefirst,
                          pickups,
                          unavailabledatesWithTime11,
                          chosenValue
                        ) {
                          const requestPath2 =
                            "/apps/ertu/orderaddpertimeslot/" + shop;
                          var datafromorderaddpertimeslot11111 = [];
                          var arraymapfiltered1111 = [];
                          var disabledPickupTimes11111 = [];
                          var unavailabledatesWithTime11111 =
                            unavailabledatesWithTime11;
                          var didyoufindany = false;
                          axios.get(requestPath2).then((response2) => {
                            if (response2.data.length > 0) {
                              response2.data.map((item) => {
                                if (locationNamefirst === item.location) {
                                  datafromorderaddpertimeslot11111.push(
                                    item.Date
                                  );
                                }
                              });
                              arraymapfiltered1111 =
                                datafromorderaddpertimeslot11111.reduce(
                                  (cnt, cur) => (
                                    (cnt[cur] = cnt[cur] + 1 || 1), cnt
                                  ),
                                  {}
                                );
                              for (let x in arraymapfiltered1111) {
                                if (x === chosenValue) {
                                  if (arraymapfiltered1111[x] >= pickups) {
                                    $('input[name="datetimes"]').attr(
                                      "value",
                                      datePickerDefaultText
                                    );
                                    const deleteCartjsRoute = "/cart/update.js";
                                    const jsonCheckout = {
                                      attributes: {
                                        Location_LinkAi_App1: "",
                                        Date_LinkAi_App1: "",
                                        Date2Moment_LinkAi_App1: "",
                                      },
                                      requires_shipping: true,
                                    };
                                    axios.post(
                                      deleteCartjsRoute,
                                      jsonCheckout,
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      }
                                    );
                                    const deleteroute =
                                      "/apps/ertu/delete/orderaddpertimeslot/" +
                                      shop +
                                      "/" +
                                      token;
                                    axios
                                      .delete(deleteroute)
                                      .then((response) => {
                                        console.log(response);
                                      });
                                    daterangepickerRun(
                                      unavailabledatesWithTime11111
                                    );
                                    didyoufindany = true;
                                  }
                                }
                              }
                              if (!didyoufindany) {
                                cartUpdateFunc(
                                  locationNamefirst,
                                  chosenValue,
                                  start.format()
                                );
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                } else {
                  $('input[name="datetimes"]').attr(
                    "value",
                    start.locale(storelocaleValue).format("ll")
                  );
                  errorForSelectPickupDateorTime.hide();

                  locations.map((location) => {
                    if (location.hasClass("activeteit")) {
                      var locationNamefirst =
                        location.find("span.name")[0].children[0].innerText;
                      cartUpdateFunc(
                        locationNamefirst,
                        start.format("DD.MM.YYYY"),
                        start.format()
                      );
                    }
                  });
                }
              }
            );
          }
        });
      }

      async function addProductForPickup(location, value, startFormat) {
        locationInfoArray.map((locationReturn) => {
          if (locationReturn.locationName === location) {
            const redirectCheckoutUrl =
              "/cart?checkout[shipping_address][company]=" +
              locationReturn.locationName +
              "&checkout[shipping_address][country]=" +
              locationReturn.country +
              "&checkout[shipping_address][address1]=" +
              locationReturn.address +
              "&checkout[shipping_address][city]=" +
              locationReturn.city +
              "&checkout[shipping_address][zip]=" +
              locationReturn.postcode +
              "&locale=en-pickup&step=contact_information";
            formUseThis.attr("action", redirectCheckoutUrl);
          }
        });

        const idOfProduct = parseInt(inStoreProductid);
        const productadd = {
          items: [
            {
              quantity: 1,
              id: idOfProduct,
            },
          ],
          attributes: {
            Location_LinkAi_App1: location,
            Date_LinkAi_App1: value,
            Date2Moment_LinkAi_App1: startFormat,
          },
        };

        const productDelete = {
          updates: {},
        };
        productDelete.updates[idOfProduct] = 0;
        if (location === "Delivery") {
          await axios
            .post("/cart/update.js", productDelete, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(deleteres);
        } else {
          await axios
            .get("/cart.js", {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response1) => {
              if (
                response1.data.items.length > 0 &&
                response1.data.items !== undefined &&
                response1.data.items !== null
              ) {
                const filterValue = response1.data.items.filter(
                  (item) => "ClickandCollectApp" === item.vendor
                );
                if (filterValue.length === 0) {
                  axios
                    .post("/cart/add.js", productadd, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                    .then(response1);
                }
              }
            });
        }
      }

      async function cartUpdateFunc(location, value, startFormat) {
        await addProductForPickup(location, value, startFormat);
        const jsonCheckout = {
          attributes: {
            Location_LinkAi_App1: location,
            Date_LinkAi_App1: value,
            Date2Moment_LinkAi_App1: startFormat,
          },
        };
        await axios
          .post("/cart/update.js", jsonCheckout, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response1) => {
            token = response1.data.token;
            const dataCheckout = {
              token: token,
              Date: value,
              location: location,
              createdAt: moment(),
              isOrderProccesed: false,
            };
            const requestPath2 = "/apps/ertu/orderaddpertimeslot/" + shop;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            axios
              .get(requestPath2)
              .then((response2) => {
                if (response2.data.length !== 0) {
                  if (location === "Delivery") {
                    response2.data.map((item) => {
                      if (token === item.token) {
                        axios.delete(deleteroute).then((response) => {
                          isApiCallDone = true;
                        });
                      }
                    });
                  } else {
                    axios
                      .post(requestPath2, dataCheckout)
                      .then((response3) => {
                        isApiCallDone = true;
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                  }
                } else if (
                  response2.data.length === 0 &&
                  location !== "Delivery" &&
                  value !== "none"
                ) {
                  axios
                    .post(requestPath2, dataCheckout)
                    .then((response) => {
                      isApiCallDone = true;
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        return true;
      }

      $(".cart__remove").click((event) => {
        window.setTimeout(getcart, 1000);
        function getcart() {
          getCartJs().then((responseCart) => {
            token = responseCart.data.token;
            const deleteroute =
              "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
            if (responseCart.data.items.length === 0) {
              deliverybutton.hide();
              pickupbutton.hide();
              calendar.hide();
              pickUpLocations.hide();
              pickupNoteForCustomers.hide();
              pickupInformPleaseSelectLocation.hide();
              $(".errorForPickupAndDelivery").hide();
              errorForSelectPickupDateorTime.hide();

              const deleteCartjsRoute = "/cart/update.js";
              const jsonCheckout = {
                attributes: {
                  Location_LinkAi_App1: "",
                  Date_LinkAi_App1: "",
                  Date2Moment_LinkAi_App1: "",
                },
                requires_shipping: true,
              };
              const resdeleteCartjsRoute = axios.post(
                deleteCartjsRoute,
                jsonCheckout,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              resdeleteCartjsRoute.then(() => {
                axios.delete(deleteroute);
              });
            } else {
              window.location.replace("/cart");
            }
          });
        }
      });

      var IsrealySumbittedForPickup = false;
      var pickupon = false;
      var isApiCallDone = false;
      $(window).on("beforeunload", function () {
        if (selected && IsrealySumbittedForPickup) {
          console.log("SUBMITTED");
        } else {
          const deleteroute =
            "/apps/ertu/delete/orderaddpertimeslot/" + shop + "/" + token;
          axios.delete(deleteroute).then((response) => {
            console.log(response);
          });
        }
      });

      var deliveryclicked = false;
      deliverybutton.click(() => {
        deliveryclicked = true;
        $("#pickup-app").css({
          "margin-bottom": "110px",
        });
        console.log("delivery button clicled");
        pickupon = false;
        IsrealySumbittedForPickup = false;
        cartUpdateFunc("Delivery", "none", "none");
        formUseThis.attr("action", "/cart?step=contact_information");
        selected = true;
        $(".errorForPickupAndDelivery").hide();
        errorForSelectPickupDateorTime.hide();
        calendar.hide();
        pickUpLocations.hide();
        pickupNoteForCustomers.hide();
        pickupInformPleaseSelectLocation.hide();
        deliverybutton.css({
          "border-color": "#b5b5b5",
          "background-color": "#f7f7f7",
        });

        pickupbutton.css({
          "border-color": "#eee",
          "background-color": "#fff",
        });
      });

      pickupbutton.click(() => {
        deliveryclicked = false;
        pickupon = true;
        $("#pickup-app .locations .location .blocklocation").css({
          "font-size": locationstextsize,
          "font-family": fontfamilylocations,
          color: hsla1,
        });

        if (pickupNoteForCustomers.text() !== "") {
          pickupNoteForCustomers.show();
        }
        if (pickupInformPleaseSelectLocation.text() !== "") {
          pickupInformPleaseSelectLocation.show();
        }

        $('input[name="datetimes"]').attr("value", datePickerDefaultText);
        errorForSelectPickupDateorTime.hide();

        formUseThis.submit(function () {
          if (
            $('input[name="datetimes"]').attr("value") ===
              datePickerDefaultText &&
            !deliveryclicked
          ) {
            errorForSelectPickupDateorTime.show();
            return false;
          }
          if (
            isApiCallDone &&
            selected &&
            pickupon &&
            $('input[name="datetimes"]').attr("value") !== datePickerDefaultText
          ) {
            IsrealySumbittedForPickup = true;
          }
        });

        selected = true;

        $(".errorForPickupAndDelivery").hide();

        if (locations.length !== 0) {
          pickUpLocations.show();
          calendar.show();
        }

        pickupbutton.css({
          "border-color": "#b5b5b5",
          "background-color": "#f7f7f7",
        });

        deliverybutton.css({
          "border-color": "#eee",
          "background-color": "#fff",
        });
      });
    }
  });
