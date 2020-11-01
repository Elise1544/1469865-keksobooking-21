'use strict';

(function () {
  window.getPopup = function (offers) {

    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const card = cardTemplate.cloneNode(true);
    const popupAvatar = card.querySelector(`.popup__avatar`);
    const popupTitle = card.querySelector(`.popup__title`);
    const popupAddress = card.querySelector(`.popup__text--address`);
    const popupPrice = card.querySelector(`.popup__text--price`);
    const popupType = card.querySelector(`.popup__type`);
    const popupCapacity = card.querySelector(`.popup__text--capacity`);
    const popupTime = card.querySelector(`.popup__text--time`);
    const popupFeatures = card.querySelector(`.popup__features`);
    const popupDescription = card.querySelector(`.popup__description`);
    const popupPhotos = card.querySelector(`.popup__photos`);

    const types = {
      bungalow: `бунгало`,
      flat: `квартира`,
      house: `дом`,
      palace: `дворец`
    };

    const getCapacityRoomsText = function (roomsCount) {
      switch (roomsCount) {
        case 1:
          return `${roomsCount} комната`;
        case 2:
        case 3:
        case 4:
          return `${roomsCount} комнаты`;
        default:
          return `${roomsCount} комнат`;
      }
    };

    const getCapacityGuestsText = function (guestsCount) {
      switch (guestsCount) {
        case 1:
          return `${guestsCount} гостя`;
        case 0:
          return `не для гостей`;
        default:
          return `${guestsCount} гостей`;
      }
    };

    popupAvatar.src = offers.author.avatar;
    popupTitle.textContent = offers.offer.title;
    popupAddress.textContent = offers.offer.address;
    popupPrice.textContent = offers.offer.price + `₽/ночь`;
    popupType.textContent = types[offers.offer.type];
    popupCapacity.textContent = `${getCapacityRoomsText(offers.offer.rooms)} ${offers.offer.guests ? `для ` : ``}${getCapacityGuestsText(offers.offer.guests)}`;
    popupTime.textContent = `Заезд после ` + `${offers.offer.checkin}` + `, выезд до ` + `${offers.offer.checkout}`;
    popupFeatures.textContent = offers.offer.features;
    popupDescription.textContent = offers.offer.description;
    popupPhotos.src = offers.offer.photos[0];
    for (let j = 1; j < offers.offer.photos.length; j++) {
      popupPhotos.insertAdjacentHTML(`beforeend`, `<img src = ${offers.offer.photos[j]} class=popup__photo width=45 height=40 alt="Фотография жилья">`);
    }

    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.parentNode.removeChild(popup);
    }

    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    window.map.insertBefore(card, mapFilterContainer);
  };

})();
