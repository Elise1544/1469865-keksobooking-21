'use strict';

(function () {

  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersElements = document.querySelectorAll(`.map__filter`);
  const mapFiltersFeatures = document.querySelector(`.map__features`);
  const price = document.querySelector(`#price`);

  mapFilters.setAttribute(`disabled`, `disabled`);

  mapFiltersElements.forEach((mapFiltersElement) => {
    mapFiltersElement.setAttribute(`disabled`, `disabled`);
  });

  mapFiltersFeatures.setAttribute(`disabled`, `disabled`);

  const getActive = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.elements.adForm.classList.remove(`ad-form--disabled`);
    mapFilters.removeAttribute(`disabled`);

    mapFiltersElements.forEach((mapFiltersElement) => {
      mapFiltersElement.removeAttribute(`disabled`, `disabled`);
    });

    mapFiltersFeatures.removeAttribute(`disabled`);
  };

  const getInactive = () => {
    window.elements.map.classList.add(`map--faded`);
    window.elements.adForm.classList.add(`ad-form--disabled`);
    mapFilters.setAttribute(`disabled`, `disabled`);
    window.pin.deletePins();
    window.popup.closePopup();
    window.elements.adForm.reset();
    mapFilters.reset();
    price.placeholder = `10000`;

    mapFiltersElements.forEach((mapFiltersElement) => {
      mapFiltersElement.setAttribute(`disabled`, `disabled`);
    });

    mapFiltersFeatures.setAttribute(`disabled`, `disabled`);
    window.util.resetMainPinCoords();
  };

  const resetMainPinCoords = () => {
    window.elements.mainPin.style.left = `${window.elements.PinSpecification.MAIN_PIN_START_X}px`;
    window.elements.mainPin.style.top = `${window.elements.PinSpecification.MAIN_PIN_START_Y}px`;
    window.elements.address.value = `${parseInt(window.elements.PinSpecification.MAIN_PIN_START_X + window.elements.PinSpecification.PIN_WIDTH / 2, 10)}, ${parseInt(window.elements.PinSpecification.MAIN_PIN_START_Y + window.elements.PinSpecification.PIN_HEIGHT / 2, 10)}`;
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const SUCCESS_WINDOW = successTemplate.cloneNode(true);
  const ERROR_WINDOW = errorTemplate.cloneNode(true);

  const onErrorMessageClick = (evt) => {
    evt.preventDefault();
    hideErrorMessage();
  };

  const onErrorMessageEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideErrorMessage();
    }
  };

  const onErrorButtonClick = (evt) => {
    evt.preventDefault();
    hideErrorMessage();
  };

  const main = document.querySelector(`main`);

  const hideErrorMessage = () => {
    const errorWindow = document.querySelector(`.error`);

    errorWindow.remove();

    document.removeEventListener(`click`, onErrorMessageClick);
    document.removeEventListener(`keydown`, onErrorMessageEscPress);
  };

  const onSuccessMessageEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  };

  const onSuccessMessageClick = (evt) => {
    evt.preventDefault();
    hideSuccessMessage();
  };

  const hideSuccessMessage = () => {
    const successWindow = document.querySelector(`.success`);
    successWindow.remove();
    document.removeEventListener(`click`, onSuccessMessageClick);
    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
  };

  const createMessage = (messageElement) => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(messageElement);
    main.appendChild(fragment);
  };

  const showErrorMessage = () => {
    createMessage(ERROR_WINDOW);
    getInactive();
    const errorButton = document.querySelector(`.error__button`);


    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`click`, onErrorMessageClick);
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const showSuccessMessage = () => {
    createMessage(SUCCESS_WINDOW);
    getInactive();

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`click`, onSuccessMessageClick);
  };

  window.util = {
    resetMainPinCoords,
    getActive,
    getInactive,
    showErrorMessage,
    showSuccessMessage
  };

})();
