'use strict';

(function () {

  let openPopup = function (evt) {
    let targetElement = evt.target;
    if (targetElement.closest(`.map__pin:not(.map__pin--main)`) || targetElement.classList.contains(`map__pin:not(.map__pin--main)`)) {
      const button = targetElement.closest(`.map__pin`) ? targetElement.closest(`.map__pin`) : targetElement;

      const dataAttr = button.dataset.offerIndex;
      const currentPinInfo = window.offers[dataAttr];
      window.getPopup(currentPinInfo);

      const buttonClose = document.querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, closePopup);
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
      closePopup();
    }
  };

  let closePopup = function () {
    const popup = document.querySelector(`.popup`);
    popup.parentNode.removeChild(popup);
    document.removeEventListener(`keydown`, onEscPress);
  };

  const mapPins = document.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, openPopup);
  mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

})();
