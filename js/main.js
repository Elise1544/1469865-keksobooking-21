'use strict';

const map = document.querySelector(`.map`);
const pin = document.querySelector(`#pin`);
const mapPin = document.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();

const PIN__WIDTH = 40;
const PIN__HEIGHT = 44;
const AMOUNT = 8;

let users = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];
let titles = [`Уютное гнездышко для молодоженов`];
let locationsX = [`500`, `200`, `350`, `420`, `550`, `150`, `570`, `230`];
let locationsY = [`300`, `150`, `100`, `220`, `600`, `230`, `400`, `510`];
let prices = [`3500`, `5200`, `4100`, `6000`, `7300`, `4500`, `5700`, `3800`];
let types = [`palace`, `flat`, `house`, `bungalow`];
let rooms = [`1`, `2`, `3`, `4`, `5`];
let guests = [`1`, `2`, `3`, `4`, `5`, `6`];
let checkins = [`12:00`, `13:00`, `14:00`];
let checkouts = [`12:00`, `13:00`, `14:00`];
let features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let descriptions = [`Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`];
let photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]

let getRandomElement = function (array) {
  for (let j = 0; j < array.length; j++) {
    let k = Math.floor(Math.random() * (j + 1));
    [array[j], array[k]] = [array[k], array[j]];
  }
  return array;
}

let getRandomAmount = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getRandomArray = function (array, length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(array[getRandomAmount(0, array.length - 1)]);
  }

  return result;
}

let getAdverts = function () {
  let adverts = [];

  for (let k = 0; k < AMOUNT; k++) {

    let amountOfFeatures = getRandomAmount(0, features.length - 1);
    let amountOfPhotos = getRandomAmount(0, photos.length - 1);

    adverts[k] = {
      author: {
        avatar: `img/avatars/user` + getRandomElement(users)[k] + `.png`
      },
      "offer": {
        "title": titles[Math.floor(Math.random() * titles.length)],
        "address": locationsX[k] + `, ` + locationsY[k],
        "price": getRandomElement(prices)[k],
        "type": types[Math.floor(Math.random() * types.length)],
        "rooms": rooms[Math.floor(Math.random() * rooms.length)],
        "guests": guests[Math.floor(Math.random() * guests.length)],
        "checkin": checkins[Math.floor(Math.random() * checkins.length)],
        "checkout": checkouts[Math.floor(Math.random() * checkouts.length)],
        "features": getRandomArray(features, amountOfFeatures),
        "description": descriptions[Math.floor(Math.random() * descriptions.length)],
        "photos": getRandomElement(photos, amountOfPhotos)
      },
      "location": {
        "x": locationsX[k],
        "y": locationsY[k]
      }
    };
  }
  return adverts;
}

let offers = getAdverts();

let renderPopup = function (offer, mapPin) {
  let advertElement = mapPin.cloneNode(true);
  let advertAvatar = advertElement.querySelector(`img`);

  advertElement.style.left = offer.locationsX + PIN__WIDTH;
  advertElement.style.top = offer.locationsY + PIN__HEIGHT;
  advertAvatar.src = offer.author.avatar;
  advertAvatar.alt = offer.offer.title;

  return advertElement;
}

let createPins = function () {
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPopup(offers[i], mapPin));
  }
  mapPins.appendChild(fragment);
}

mapPins.classList.remove(`map--faded`);

createPins()

// for (var k = 0; k < wizards.length; k++) {
//   fragment.appendChild(renderWizard(wizards[k]));
// }
// similarListElement.appendChild(fragment);

// var setup = document.querySelector(`.setup`);
// var setupSimilar = document.querySelector(`.setup-similar`);
// var similarListElement = setup.querySelector(`.setup-similar-list`);
// var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
//   .content
//   .querySelector(`.setup-similar-item`);
// var fragment = document.createDocumentFragment();

// var renderWizard = function (wizard) {
  //   var wizardElement = similarWizardTemplate.cloneNode(true);

  //   wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  //   wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  //   wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  //   return wizardElement;
  // };


// var shuffle = function (array) {
  //   for (var i = 0; i < array.length; i++) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

// {
//   "author": {
//       "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },
//   "offer": {
//       "title": строка, заголовок предложения
//       "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//       "price": число, стоимость
//       "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
//       "rooms": число, количество комнат
//       "guests": число, количество гостей, которое можно разместить
//       "": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//       "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//       "description": строка с описанием,
//       "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },
//   "location": {
//       "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//       "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }


// 'use strict';

// var setup = document.querySelector(`.setup`);
// var setupSimilar = document.querySelector(`.setup-similar`);
// var similarListElement = setup.querySelector(`.setup-similar-list`);
// var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
//   .content
//   .querySelector(`.setup-similar-item`);
// var fragment = document.createDocumentFragment();
// var names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
// var surnames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
// var coatColor = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
// var eyesColor = [`black`, `red`, `blue`, `yellow`, `green`];

// setup.classList.remove(`hidden`);

// var shuffle = function (array) {
//   for (var i = 0; i < array.length; i++) {
//     var j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// var finalNames = shuffle(names);
// var finalSurnames = shuffle(surnames);

// var finalName = [];
// for (var i = 0; i < finalNames.length; i++) {
//   finalName[i] = finalNames[i] + ` ` + finalSurnames[i];
// }

// var wizards = [];
// for (var j = 0; j < 4; j++) {
//   wizards[j] = {
//     name: finalName[Math.floor(Math.random() * finalName.length)],
//     coatColor: coatColor[Math.floor(Math.random() * coatColor.length)],
//     eyesColor: eyesColor[Math.floor(Math.random() * eyesColor.length)]
//   };
// }

// var renderWizard = function (wizard) {
//   var wizardElement = similarWizardTemplate.cloneNode(true);

//   wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
//   wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
//   wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

//   return wizardElement;
// };

// for (var k = 0; k < wizards.length; k++) {
//   fragment.appendChild(renderWizard(wizards[k]));
// }
// similarListElement.appendChild(fragment);

// setupSimilar.classList.remove(`hidden`);
