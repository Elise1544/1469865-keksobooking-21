'use strict';

(function () {

  window.MAX_PINS = 5;
  const mapFilter = document.querySelector(`.map__filters`);
  const filterType = mapFilter.querySelector(`#housing-type`);
  const filterPrice = mapFilter.querySelector(`#housing-price`);
  const filterRooms = mapFilter.querySelector(`#housing-rooms`);
  const filterGuests = mapFilter.querySelector(`#housing-guests`);
  const filterFeatures = mapFilter.querySelector(`#housing-features`);

  const START_VALUE = `any`;

  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;

  const checkPrice = function (offer) {
    switch (filterPrice.value) {
      case `any`:
        return true;
      case `low`:
        return (offer.offer.price < MIN_PRICE);
      case `middle`:
        return (offer.offer.price >= MIN_PRICE) && (offer.offer.price <= MAX_PRICE);
      case `high`:
        return (offer.offer.price > MAX_PRICE);
    }
  };

  const checkFeatures = function () {
    return Array.from(filterFeatures.querySelectorAll(`input:checked`)).map(function (feature) {
      return feature.value;
    })
  }

  window.getFilter = function (dataOffers) {

    return dataOffers
      .filter(function (offer) {
        let isOfferFit = !!(offer.offer);
        let isTypeFit = filterType.value === START_VALUE ? true : offer.offer.type === filterType.value;
        let isPriceFit = checkPrice(offer);
        let isRoomsFit = filterRooms.value === START_VALUE ? true : offer.offer.rooms === +filterRooms.value;
        let isGuestsFit = filterGuests.value === START_VALUE ? true : offer.offer.guests === +filterGuests.value;
        let isFeaturesFit = checkFeatures().every(function (feature) {
          return offer.offer.features.includes(feature);
        });
        return isOfferFit && isTypeFit && isPriceFit && isRoomsFit && isGuestsFit && isFeaturesFit;
      }).slice(0, window.MAX_PINS);
  }

  const onFilterChange = function () {
    window.closePopup();
    window.deletePins();
    window.createPins(window.getFilter(window.offers));
  }

  mapFilter.addEventListener(`change`, onFilterChange);

})();
