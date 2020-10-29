'use strict';

(function () {
  //   // popup.classList.add(`visually-hidden`);
  let openPopup = function (evt) {
    let targetElement = evt.target;

    // if (targetElement.closest(`button`) || targetElement.classList.contains(`map__pin`) && !targetElement.classList.contains(`map__pin--main`)) {
    if (targetElement.closest(`button`) || targetElement.classList.contains(`map__pin`)) {
      const button = targetElement.closest(`button`) ? targetElement.closest(`button`) : targetElement;

      const dataAttr = button.dataset.offerIndex;
      const currentPinInfo = window.offers[dataAttr];
      window.getPopup(currentPinInfo);

    } else if (!targetElement.classList.contains(`map__pin--main`)) {
      // ;
    } else {
      // ;
    }
  };

  let closePopup = function () {
    const buttonClose = document.querySelector(`.popup__close`);
    const popup = document.querySelector(`.popup`);

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        // popup.style.display = `none`;
        popup.parentNode.removeChild(popup);
      }
    });

    buttonClose.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      // popup.style.display = `none`;
      popup.parentNode.removeChild(popup);
    });

  };

  const mapPins = document.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, openPopup);
  mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });
  document.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, closePopup);

})();
