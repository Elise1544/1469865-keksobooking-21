'use strict';

(function () {

  let openPopup = function (evt) {

    const popup = document.querySelector(`.popup`);
    if (popup) {
      window.closePopup();
      window.button.classList.remove(`map__pin--active`);
    }

    let targetElement = evt.target;
    if (targetElement.closest(`.map__pin:not(.map__pin--main)`) || targetElement.classList.contains(`map__pin:not(.map__pin--main)`)) {
      window.button = targetElement.closest(`.map__pin`) ? targetElement.closest(`.map__pin`) : targetElement;

      const dataAttr = window.button.dataset.offerIndex;
      const currentPinInfo = window.getFilter(window.offers)[dataAttr];
      window.getPopup(currentPinInfo);

      window.button.classList.add(`map__pin--active`);

      const buttonClose = document.querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, window.closePopup);
      document.addEventListener(`keydown`, onEscPress);
    } else if (targetElement.classList.contains(`map__pin--main`)) {
      // ;
    } else {
      // ;
    }

  };

  let onEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.closePopup();
    }
  };

  window.closePopup = function () {
    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.parentNode.removeChild(popup);
      window.button.classList.remove(`map__pin--active`);
      document.removeEventListener(`keydown`, onEscPress);
    }

  };

  const mapPins = document.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, openPopup);
  mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

})();
