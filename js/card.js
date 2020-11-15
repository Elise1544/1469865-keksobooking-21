'use strict';

(function () {

  const mapFilterContainer = document.querySelector(`.map__filters-container`);

  const Types = {
    bungalow: `бунгало`,
    flat: `квартира`,
    house: `дом`,
    palace: `дворец`
  };

  const Features = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const getPopup = (offers) => {

    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const card = cardTemplate.cloneNode(true);

    const getCapacityRoomsText = (roomsCount) => {
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

    const getCapacityGuestsText = (guestsCount) => {
      switch (guestsCount) {
        case 1:
          return `${guestsCount} гостя`;
        case 0:
          return `не для гостей`;
        default:
          return `${guestsCount} гостей`;
      }
    };

    const {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    } = offers.offer;

    if (offers.author.avatar) {
      card.querySelector(`.popup__avatar`).src = offers.author.avatar;
    }

    if (title) {
      card.querySelector(`.popup__title`).textContent = title;
    }

    if (address) {
      card.querySelector(`.popup__text--address`).textContent = address;
    }

    if (price) {
      card.querySelector(`.popup__text--price`).textContent = price + `₽/ночь`;
    }

    if (type) {
      card.querySelector(`.popup__type`).textContent = Types[type];
    }

    if (rooms) {
      card.querySelector(`.popup__text--capacity`).textContent = `${getCapacityRoomsText(rooms)} ${guests ? `для ` : ``}${getCapacityGuestsText(guests)}`;
    }

    if (checkin) {
      card.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    }

    if (features) {
      for (let Feature of Features) {
        if (!features.includes(Feature)) {
          card.querySelector(`.popup__feature--${Feature}`).remove();
        }
      }
    }

    if (description) {
      card.querySelector(`.popup__description`).textContent = description;
    }

    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        let img = document.createElement(`img`);
        img.className = `popup__photo`;
        img.width = `45`;
        img.height = `40`;
        img.alt = `Фотография жилья`;
        img.src = photos[i];
        card.querySelector(`.popup__photos`).appendChild(img);
      }
    }

    window.elements.map.insertBefore(card, mapFilterContainer);

  };

  window.card = {
    getPopup
  };

})();
