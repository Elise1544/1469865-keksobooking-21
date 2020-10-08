'use strict';

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

const PIN__WIDTH = 40;
const PIN__HEIGHT = 44;
const AMOUNT = 8;
const CLIENT__WIDTH = map.clientWidth - PIN__WIDTH * 2;

const titles = [`Уютное гнездышко для молодоженов`];
const types = [`palace`, `flat`, `house`, `bungalow`];
const checkins = [`12:00`, `13:00`, `14:00`];
const checkouts = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

// служебные функции
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

// формирование предложения
let getAdvert = function (k) {
  let locationX = getRandomAmount(0, CLIENT__WIDTH);
  let locationY = getRandomAmount(130, 580);
  let advert = {
    author: {
      avatar: `img/avatars/user0${k + 1}.png`
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
    adverts[k] = getAdvert(k);
  }
  return adverts;
};
let offers = getAdverts();

// добавление предложений в разметку
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

// отрисовка предложений
let createPins = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPopup(offers[i]));
  }
  mapPins.appendChild(fragment);
};

// mapPins.classList.remove(`map--faded`);

const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapFiltersElements = document.querySelectorAll(`.map__filter`);
const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const address = adForm.querySelector(`#address`);

mapFilters.setAttribute(`disabled`, `disabled`);
for (let mapFiltersElement of mapFiltersElements) {
  mapFiltersElement.setAttribute(`disabled`, `disabled`);
}

const getActive = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.removeAttribute(`disabled`);

  for (let mapFiltersElement of mapFiltersElements) {
    mapFiltersElement.removeAttribute(`disabled`);
  }
};

const getPriceMinimum = function () {
  if (type.value === `flat`) {
    price.setAttribute(`min`, `1000`);
  } else if (type.value === `house`) {
    price.setAttribute(`min`, `5000`);
  } else if (type.value === `palace`) {
    price.setAttribute(`min`, `10000`);
  } else {
    price.setAttribute(`min`, `0`);
  }
  price.reportValidity();
};

const getPrice = function () {
  if (type.value === `flat`) {
    price.placeholder = `5000`;
  } else if (type.value === `house`) {
    price.placeholder = `10000`;
  } else if (type.value === `palace`) {
    price.placeholder = `20000`;
  } else {
    price.placeholder = `1000`;
  }
};

const getTime = function () {
  if (timein.value === `12:00`) {
    timeout.value = `12:00`;
  } else if (timein.value === `13:00`) {
    timeout.value = `13:00`;
  } else {
    timeout.value = `14:00`;
  }
};

const getCapacity = function () {
  if (roomNumber.value === `1`) {
    if (capacity.value === `1`) {
      capacity.setCustomValidity(``);
    } else {
      capacity.setCustomValidity(`Подходит только для 1 гостя`);
    }
  } else if (roomNumber.value === `2`) {
    if ((capacity.value === `1`) || (capacity.value === `2`)) {
      capacity.setCustomValidity(``);
    } else {
      capacity.setCustomValidity(`Подходит только для 1 или 2 гостей`);
    }
  } else if (roomNumber.value === `3`) {
    if ((capacity.value === `1`) || (capacity.value === `2`) || (capacity.value === `3`)) {
      capacity.setCustomValidity(``);
    } else {
      capacity.setCustomValidity(`Подходит для 1, 2 или 3 гостей`);
    }
  } else if (roomNumber.value === `100`) {
    if (capacity.value === `0`) {
      capacity.setCustomValidity(``);
    } else {
      capacity.setCustomValidity(`Не подходит для гостей`);
    }
  }
  capacity.reportValidity();
};

// const getAddress = function () {
address.value = mainPin.style.left + `, ` + mainPin.style.top;
// };

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    getActive();
    createPins();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    getActive();
    createPins();
  }
});

price.addEventListener(`input`, function () {
  getPriceMinimum();
});

type.addEventListener(`change`, function () {
  getPrice();
});

timein.addEventListener(`change`, function () {
  getTime();
});

capacity.addEventListener(`change`, function () {
  getCapacity();
});


