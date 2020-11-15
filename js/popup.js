'use strict';

(function () {

  const openPopup = (evt) => {

    const popup = document.querySelector(`.popup`);
    if (popup) {
      closePopup();
    }

    const targetElement = evt.target;
    if (targetElement.closest(`.map__pin:not(.map__pin--main)`) || targetElement.classList.contains(`map__pin:not(.map__pin--main)`)) {
      const button = targetElement.closest(`.map__pin`) ? targetElement.closest(`.map__pin`) : targetElement;

      const dataAttr = button.dataset.offerIndex;
      const currentPinInfo = window.render.visibleOffers[dataAttr];
      window.card.getPopup(currentPinInfo);

      button.classList.add(`map__pin--active`);

      const buttonClose = document.querySelector(`.popup__close`);
      buttonClose.addEventListener(`click`, onButtonCloseClick);
      document.addEventListener(`keydown`, onEscPress);
    }

  };

  const onButtonCloseClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const onEscPress = (evt) => {
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

  const onPinClick = (evt) => {
    openPopup(evt);
  };

  const onPinEnterPress = (evt) => {
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
