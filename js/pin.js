'use strict';

(function () {
  window.mapPins = document.querySelector(`.map__pins`);

  window.createPins = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < window.offers.length; i++) {
      fragment.appendChild(window.renderPin(window.offers[i], i));
    }
    window.mapPins.appendChild(fragment);
  };

  window.deletePins = function () {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach(function (pin) {
      pin.remove();
    });
  };


})();
