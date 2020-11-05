'use strict';

(function () {

  window.getRandomAmount = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getRandomArray = function (array, length) {
    let result = [];

    for (let i = 0; i < length; i++) {
      if (!result.includes[i]) {
        result.push(array[i]);
      }
    }

    return result;
  };

  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersElements = document.querySelectorAll(`.map__filter`);

  mapFilters.setAttribute(`disabled`, `disabled`);
  for (let mapFiltersElement of mapFiltersElements) {
    mapFiltersElement.setAttribute(`disabled`, `disabled`);
  }

  window.getActive = function () {
    window.map.classList.remove(`map--faded`);
    window.adForm.classList.remove(`ad-form--disabled`);
    mapFilters.removeAttribute(`disabled`);

    for (let mapFiltersElement of mapFiltersElements) {
      mapFiltersElement.removeAttribute(`disabled`);
    }
  };

  window.getInactive = function () {
    window.map.classList.add(`map--faded`);
    window.adForm.classList.add(`ad-form--disabled`);
    mapFilters.setAttribute(`disabled`, `disabled`);
    window.deletePins();
    window.closePopup();
    window.adForm.reset();
    window.price.placeholder = `10000`;

    for (let mapFiltersElement of mapFiltersElements) {
      mapFiltersElement.setAttribute(`disabled`, `disabled`);
    }
  };

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  window.SUCCESS_WINDOW = successTemplate.cloneNode(true);
  window.ERROR_WINDOW = errorTemplate.cloneNode(true);

  const onErrorMessageClick = function (evt) {
    evt.preventDefault();
    window.error.classList.add(`hidden`);
    hideErrorMessage();
  };

  const onErrorMessageEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.error.classList.add(`hidden`);
      hideErrorMessage();
    }
  };

  const onErrorButtonClick = function (evt) {
    evt.preventDefault();
    window.error.classList.add(`hidden`);
    hideErrorMessage();
  };

  window.main = document.querySelector(`main`);

  const hideErrorMessage = function () {
    const errorWindow = document.querySelector(`.error`);
    errorWindow.remove();

    document.removeEventListener(`click`, onErrorMessageClick);
    document.removeEventListener(`keydown`, onErrorMessageEscPress);
  };

  const onSuccessMessageEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideSuccessMessage();
    }
  };

  const onSuccessMessageClick = function (evt) {
    evt.preventDefault();
    hideSuccessMessage();
  };

  const hideSuccessMessage = function () {
    const successWindow = document.querySelector(`.success`);
    successWindow.remove();
    document.removeEventListener(`click`, onSuccessMessageClick);
    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
  };

  window.createMessage = function (messageElement) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(messageElement);
    window.main.appendChild(fragment);
  };

  window.showErrorMessage = function () {
    const errorButton = document.querySelector(`.error__button`);

    window.createMessage(window.ERROR_WINDOW);
    window.getInactive();

    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`click`, onErrorMessageClick);
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  window.showSuccessMessage = function () {
    window.createMessage(window.SUCCESS_WINDOW);
    window.getInactive();

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`click`, onSuccessMessageClick);
  };

})();
