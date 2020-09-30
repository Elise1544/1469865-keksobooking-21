'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

const PIN__WIDTH = 40;
const PIN__HEIGHT = 44;
const AMOUNT = 8;
const clientWidth = map.clientWidth - PIN__WIDTH * 2;

let users = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
let titles = [`Уютное гнездышко для молодоженов`];
let types = [`palace`, `flat`, `house`, `bungalow`];
let checkins = [`12:00`, `13:00`, `14:00`];
let checkouts = [`12:00`, `13:00`, `14:00`];
let features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
let photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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

let getAdverts = function () {
  let adverts = [];

  for (let k = 0; k < AMOUNT; k++) {
    let amountOfFeatures = getRandomAmount(0, features.length);
    let amountOfPhotos = getRandomAmount(0, photos.length);
    let location = {
      x: getRandomAmount(0, clientWidth),
      y: getRandomAmount(130, 580)
    };

    adverts[k] = {
      author: {
        avatar: `img/avatars/user` + users[k] + `.png`
      },
      offer: {
        title: titles[Math.floor(Math.random() * titles.length)],
        address: `${location.x}, ${location.y}`,
        price: getRandomAmount(1000, 10000),
        type: types[Math.floor(Math.random() * types.length)],
        rooms: getRandomAmount(1, 4),
        guests: getRandomAmount(1, 8),
        checkin: checkins[Math.floor(Math.random() * checkins.length)],
        checkout: checkouts[Math.floor(Math.random() * checkouts.length)],
        features: getRandomArray(features, amountOfFeatures),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        photos: getRandomArray(photos, amountOfPhotos)
      },
      location: {
        x: location.x,
        y: location.y
      }
    };
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
