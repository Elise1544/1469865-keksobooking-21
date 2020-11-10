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
    const popupDescription = card.querySelector(`.popup__description`);
    const popupPhotos = card.querySelector(`.popup__photos`);

    const types = {
      bungalow: `бунгало`,
      flat: `квартира`,
      house: `дом`,
      palace: `дворец`
    };

    const features = [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ];

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

    if (offers.author.avatar) {
      popupAvatar.src = offers.author.avatar;
    }

    if (offers.offer.title) {
      popupTitle.textContent = offers.offer.title;
    }

    if (offers.offer.address) {
      popupAddress.textContent = offers.offer.address;
    }

    if (offers.offer.price) {
      popupPrice.textContent = offers.offer.price + `₽/ночь`;
    }

    if (offers.offer.type) {
      popupType.textContent = types[offers.offer.type];
    }

    if (offers.offer.rooms) {
      popupCapacity.textContent = `${getCapacityRoomsText(offers.offer.rooms)} ${offers.offer.guests ? `для ` : ``}${getCapacityGuestsText(offers.offer.guests)}`;
    }

    if (offers.offer.checkin) {
      popupTime.textContent = `Заезд после ` + `${offers.offer.checkin}` + `, выезд до ` + `${offers.offer.checkout}`;
    }

    if (offers.offer.features) {
      for (let feature of features) {
        if (!offers.offer.features.includes(feature)) {
          card.querySelector(`.popup__feature--${feature}`).remove();
        }
      }
    }

    if (offers.offer.description) {
      popupDescription.textContent = offers.offer.description;
    }

    if (offers.offer.photos) {
      popupPhotos.src = offers.offer.photos[0];
      for (let i = 1; i < offers.offer.photos.length; i++) {
        popupPhotos.insertAdjacentHTML(`beforeend`, `<img src = ${offers.offer.photos[i]} class=popup__photo width=45 height=40 alt="Фотография жилья">`);
      }
    }

    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    window.map.insertBefore(card, mapFilterContainer);

  };

})();
