'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);

  let onSuccess = (offersData) => {
    window.offers = offersData;

    window.getActive();
    window.createPins();
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.download(onSuccess, window.onError);
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.download(onSuccess, window.onError);
    }
  });

})();
