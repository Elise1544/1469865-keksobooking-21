'use strict';

(function () {

  const Codes = {
    OK: 200,
    PAGE_MOVED: 302,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  const PinSpecification = {
    PIN_WIDTH: 65,
    PIN_HEIGHT: 65,
    MAX_PIN_HEIGHT: 87,
    MAIN_PIN_START_X: 570,
    MAIN_PIN_START_Y: 375
  };

  const MapSpecification = {
    MAP_MIN_WIDTH: 0,
    MAP_MAX_WIDTH: 1200,
    MAP_MIN_HEIGTH: 130,
    MAP_MAX_HEIGHT: 630
  };

  const PinLimits = {
    MIN_Y: MapSpecification.MAP_MIN_HEIGTH - PinSpecification.MAX_PIN_HEIGHT,
    MAX_Y: MapSpecification.MAP_MAX_HEIGHT - PinSpecification.MAX_PIN_HEIGHT,
    MIN_X: MapSpecification.MAP_MIN_WIDTH - PinSpecification.PIN_WIDTH / 2,
    MAX_X: MapSpecification.MAP_MAX_WIDTH - PinSpecification.PIN_WIDTH / 2
  };

  const adForm = document.querySelector(`.ad-form`);
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);

  window.elements = {
    Codes,
    adForm,
    map,
    mainPin,
    address,
    PinSpecification,
    MapSpecification,
    PinLimits
  };

})();
