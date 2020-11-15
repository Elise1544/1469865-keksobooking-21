'use strict';

(function () {

  window.util.resetMainPinCoords();

  const onSuccess = (offersData) => {
    window.offers = offersData;

    window.util.getActive();
    window.pin.createPins(window.render.getFilter(offersData));
  };

  window.elements.mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.download.download(onSuccess, window.util.showErrorMessage);
    }
  });

  window.elements.mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.download.download(onSuccess, window.util.showErrorMessage);
    }
  });

})();
