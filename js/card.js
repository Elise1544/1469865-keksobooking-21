'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const AMOUNT = 8;
  const PIN__WIDTH = 40;
  const CLIENT__WIDTH = map.clientWidth - PIN__WIDTH * 2;

  const titles = [`Уютное гнездышко для молодоженов`];
  const types = [`palace`, `flat`, `house`, `bungalow`];
  const checkins = [`12:00`, `13:00`, `14:00`];
  const checkouts = [`12:00`, `13:00`, `14:00`];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
  const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  let getAdvert = function (k) {
    let locationX = window.getRandomAmount(0, CLIENT__WIDTH);
    let locationY = window.getRandomAmount(130, 580);
    let advert = {
      author: {
        avatar: `img/avatars/user0${k + 1}.png`
      },
      offer: {
        title: titles[Math.floor(Math.random() * titles.length)],
        address: `${locationX}, ${locationY}`,
        price: window.getRandomAmount(1000, 10000),
        type: types[Math.floor(Math.random() * types.length)],
        rooms: window.getRandomAmount(1, 4),
        guests: window.getRandomAmount(1, 8),
        checkin: checkins[Math.floor(Math.random() * checkins.length)],
        checkout: checkouts[Math.floor(Math.random() * checkouts.length)],
        features: window.getRandomArray(features, window.getRandomAmount(0, features.length)),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        photos: window.getRandomArray(photos, window.getRandomAmount(0, photos.length))
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return advert;
  };

  let getAdverts = function () {
    let adverts = [];
    for (let k = 0; k < AMOUNT; k++) {
      adverts[k] = getAdvert(k);
    }
    return adverts;
  };

  window.offers = getAdverts();
})();

