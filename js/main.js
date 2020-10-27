'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.getActive();
      window.createPins();

      window.addPopups(window.cards, window.createPins());
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.getActive();
      window.createPins();
    }
  });

})();
