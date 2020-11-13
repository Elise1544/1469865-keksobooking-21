'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);

  const createPins = (data) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(window.map.renderPin(data[i], i));
    }
    mapPins.appendChild(fragment);
  };

  const deletePins = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  window.pin = {
    createPins,
    deletePins
  };

})();
