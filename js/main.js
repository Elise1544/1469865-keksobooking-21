'use strict';

(function () {
  window.mainPin = document.querySelector(`.map__pin--main`);

  let onSuccess = function (offersData) {
    window.offers = offersData;

    window.getActive();
    window.createPins();
  };

  window.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.download(onSuccess, window.onError);
    }
  });

  window.mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.download(onSuccess, window.onError);
    }
  });

})();
