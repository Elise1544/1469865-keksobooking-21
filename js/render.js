'use strict';

(function () {

  const mapFilter = document.querySelector(`.map__filters`);
  const filterType = mapFilter.querySelector(`#housing-type`);
  const filterPrice = mapFilter.querySelector(`#housing-price`);
  const filterRooms = mapFilter.querySelector(`#housing-rooms`);
  const filterGuests = mapFilter.querySelector(`#housing-guests`);
  const filterFeatures = mapFilter.querySelector(`#housing-features`);

  const START_VALUE = `any`;

  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;

  const checkPrice = (offer) => {
    switch (filterPrice.value) {
      case `any`:
        return true;
      case `low`:
        return (offer.offer.price < MIN_PRICE);
      case `middle`:
        return (offer.offer.price >= MIN_PRICE) && (offer.offer.price <= MAX_PRICE);
      case `high`:
        return (offer.offer.price > MAX_PRICE);
      default:
        return offer === filterPrice.value;
    }
  };

  const checkFeatures = () => {
    return Array.from(filterFeatures.querySelectorAll(`input:checked`)).map((feature) => {
      return feature.value;
    });
  };

  const getFilter = (dataOffers) => {
    let offersToFilter = [...dataOffers];
    let filteredOffers = [];
    let currentIndex = 0;

    for (let i = 0; filteredOffers.length < 5; i++) {
      let foundElement = offersToFilter.find((offer, index) => {
        let isOfferFit = !!(offer.offer);
        let isTypeFit = filterType.value === START_VALUE ? true : offer.offer.type === filterType.value;
        let isPriceFit = checkPrice(offer);
        let isRoomsFit = filterRooms.value === START_VALUE ? true : offer.offer.rooms === +filterRooms.value;
        let isGuestsFit = filterGuests.value === START_VALUE ? true : offer.offer.guests === +filterGuests.value;
        let isFeaturesFit = checkFeatures().every((feature) => {
          return offer.offer.features.includes(feature);
        });
        currentIndex = index;

        return isOfferFit && isTypeFit && isPriceFit && isRoomsFit && isGuestsFit && isFeaturesFit;
      });

      if (foundElement) {
        filteredOffers.push(foundElement);
        offersToFilter = offersToFilter.splice(currentIndex + 1);

        if (filteredOffers.length === 5) {
          break;
        }
      }
      if (i > dataOffers.length - 1) {
        break;
      }
    }
    return filteredOffers;
  };

  const onFilterChange = window.debounce.debounce(() => {
    window.popup.closePopup();
    window.pin.deletePins();
    window.pin.createPins(getFilter(window.offers));
  });

  mapFilter.addEventListener(`change`, onFilterChange);

  window.render = {
    getFilter
  };

})();
