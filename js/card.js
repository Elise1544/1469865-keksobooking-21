'use strict';

// (function () {
//   const map = document.querySelector(`.map`);
//   const AMOUNT = 8;
//   const PIN__WIDTH = 40;
//   const CLIENT__WIDTH = map.clientWidth - PIN__WIDTH * 2;

//   const titles = [`Уютное гнездышко для молодоженов`];
//   const types = [`palace`, `flat`, `house`, `bungalow`];
//   const checkins = [`12:00`, `13:00`, `14:00`];
//   const checkouts = [`12:00`, `13:00`, `14:00`];
//   const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
//   const descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
//   const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

//   let getAdvert = function (k) {
//     let locationX = window.getRandomAmount(0, CLIENT__WIDTH);
//     let locationY = window.getRandomAmount(130, 580);
//     let advert = {
//       author: {
//         avatar: `img/avatars/user0${k + 1}.png`
//       },
//       offer: {
//         title: titles[Math.floor(Math.random() * titles.length)],
//         address: `${locationX}, ${locationY}`,
//         price: window.getRandomAmount(1000, 10000),
//         type: types[Math.floor(Math.random() * types.length)],
//         rooms: window.getRandomAmount(1, 4),
//         guests: window.getRandomAmount(1, 8),
//         checkin: checkins[Math.floor(Math.random() * checkins.length)],
//         checkout: checkouts[Math.floor(Math.random() * checkouts.length)],
//         features: window.getRandomArray(features, window.getRandomAmount(0, features.length)),
//         description: descriptions[Math.floor(Math.random() * descriptions.length)],
//         photos: window.getRandomArray(photos, window.getRandomAmount(0, photos.length))
//       },
//       location: {
//         x: locationX,
//         y: locationY
//       }
//     };
//     return advert;
//   };

//   let getAdverts = function () {
//     let adverts = [];
//     for (let k = 0; k < AMOUNT; k++) {
//       adverts[k] = getAdvert(k);
//     }
//     return adverts;
//   };

//   window.offers = getAdverts();
// })();

(function () {
  const renderPopup = function (offers) {

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

    // const getCapacityRooms = function () {
    //   let rooms;
    //   if (offers.offer.rooms === 1) {
    //     `${offers.offer.rooms} комната для`
    //   } else {
    //     `${offers.offer.rooms} комнаты для `
    //   }
    //   return rooms;
    // };

    // const getCapacityGuests = function () {
    //   let guests;
    //   if (offers.offer.guests === 1) {
    //     `${offers.offer.guests} гостя.`
    //   } else {
    //     `${offers.offer.guests} гостей.`
    //   }
    //   return guests;
    // };

    popupTitle.textContent = offers.offer.title;
    popupAddress.textContent = offers.offer.address;
    popupPrice.textContent = offers.offer.price + `₽/ночь`;
    popupType.textContent = types[offers.offer.type];
    popupCapacity.textContent = `${offers.offer.rooms} комнаты для ` + `${offers.offer.guests} гостей.`;
    popupTime.textContent = `Заезд после ` + `${offers.offer.checkin}` + `, выезд до ` + `${offers.offer.checkout}`;
    popupFeatures.textContent = offers.offer.features;
    popupDescription.textContent = offers.offer.description;
    for (let i = 0; i < offers.offer.photos.length; i++) {
      popupPhotos.insertAdjacentHTML(`beforeend`, `<img src = ${offers.offer.photos[i]} class=popup__photo width=45 height=40 alt="Фотография жилья">`);
    }
    popupAvatar.scr = offers.author.avatar;

    return card;
  };

  window.addPopups = function (arr) {
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPopup(arr[i]));
    }

    mapFiltersContainer.before(fragment);
  };

})();
