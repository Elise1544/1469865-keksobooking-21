'use strict';

(function () {

  let openPopup = (evt) => {

    const popup = document.querySelector(`.popup`);
    if (popup) {
      closePopup();
    }

    let targetElement = evt.target;
    if (targetElement.closest(`.map__pin:not(.map__pin--main)`) || targetElement.classList.contains(`map__pin:not(.map__pin--main)`)) {
      const button = targetElement.closest(`.map__pin`) ? targetElement.closest(`.map__pin`) : targetElement;

      const dataAttr = button.getAttribute(`data-offer-index`);
      const currentPinInfo = window.render.getFilter(window.offers)[dataAttr];
      window.card.getPopup(currentPinInfo);

      button.classList.add(`map__pin--active`);

      const buttonClose = document.querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, onButtonCloseClick);
      document.addEventListener(`keydown`, onEscPress);
    } else if (targetElement.classList.contains(`map__pin--main`)) {
      // ;
    } else {
      // ;
    }

  };

  let onButtonCloseClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  let onEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.parentNode.removeChild(popup);
      const activePin = document.querySelector(`.map__pin--active`);
      activePin.classList.remove(`map__pin--active`);
      document.removeEventListener(`keydown`, onEscPress);
    }

  };

  let onPinClick = (evt) => {
    openPopup(evt);
  };

  let onPinEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      openPopup(evt);
    }
  };

  const mapPins = document.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, onPinClick);
  mapPins.addEventListener(`keydown`, onPinEnterPress);

  window.popup = {
    closePopup
  };

})();
