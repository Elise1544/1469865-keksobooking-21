'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

const PIN__WIDTH = 40;
const PIN__HEIGHT = 44;
const AMOUNT = 8;
const CLIENT__WIDTH = map.clientWidth - PIN__WIDTH * 2;

const users = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
const titles = [`Уютное гнездышко для молодоженов`];
const types = [`palace`, `flat`, `house`, `bungalow`];
const checkins = [`12:00`, `13:00`, `14:00`];
const checkouts = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

let getRandomAmount = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getRandomArray = function (array, length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    if (!result.includes[i]) {
      result.push(array[i]);
    }
  }

  return result;
};

let getAdvert = function (client) {
  let locationX = getRandomAmount(0, CLIENT__WIDTH);
  let locationY = getRandomAmount(130, 580);
  let advert = {
    author: {
      avatar: `img/avatars/user` + client + `.png`
    },
    offer: {
      title: titles[Math.floor(Math.random() * titles.length)],
      address: `${locationX}, ${locationY}`,
      price: getRandomAmount(1000, 10000),
      type: types[Math.floor(Math.random() * types.length)],
      rooms: getRandomAmount(1, 4),
      guests: getRandomAmount(1, 8),
      checkin: checkins[Math.floor(Math.random() * checkins.length)],
      checkout: checkouts[Math.floor(Math.random() * checkouts.length)],
      features: getRandomArray(features, getRandomAmount(0, features.length)),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      photos: getRandomArray(photos, getRandomAmount(0, photos.length))
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
    adverts[k] = getAdvert(users[k], k);
  }
  return adverts;
};
let offers = getAdverts();

let renderPopup = function (offer) {
  const pin = document.querySelector(`#pin`);
  let advertElement = pin.content.cloneNode(true);
  let advertPin = advertElement.querySelector(`button`);
  let advertAvatar = advertElement.querySelector(`img`);

  advertPin.style.left = `${offer.location.x + PIN__WIDTH / 2}px`;
  advertPin.style.top = `${offer.location.y + PIN__HEIGHT}px`;
  advertAvatar.src = offer.author.avatar;
  advertAvatar.alt = offer.offer.title;

  return advertElement;
};

let createPins = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPopup(offers[i]));
  }
  mapPins.appendChild(fragment);
};

mapPins.classList.remove(`map--faded`);

createPins();
