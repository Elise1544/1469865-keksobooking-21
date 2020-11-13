'use strict';

(function () {

  const adFormReset = window.elements.adForm.querySelector(`.ad-form__reset`);
  const type = window.elements.adForm.querySelector(`#type`);
  const price = window.elements.adForm.querySelector(`#price`);
  const timein = window.elements.adForm.querySelector(`#timein`);
  const timeout = window.elements.adForm.querySelector(`#timeout`);
  const roomNumber = window.elements.adForm.querySelector(`#room_number`);
  const capacity = window.elements.adForm.querySelector(`#capacity`);

  const Prices = {
    MIN_PRICE_FLAT: `1000`,
    MIN_PRICE_HOUSE: `5000`,
    MIN_PRICE_PALACE: `10000`,
    MIN_PRICE_BUNGALOW: `0`,
  };

  const Placeholders = {
    PLACEHOLDER_FLAT: `5000`,
    PLACEHOLDER_HOUSE: `10000`,
    PLACEHOLDER_PALACE: `50000`,
    PLACEHOLDER_BUNGALOW: `1000`
  };

  const validPriceMinimum = () => {
    switch (type.value) {
      case `flat`:
        price.setAttribute(`min`, Prices.MIN_PRICE_FLAT);
        break;
      case `house`:
        price.setAttribute(`min`, Prices.MIN_PRICE_HOUSE);
        break;
      case `palace`:
        price.setAttribute(`min`, Prices.MIN_PRICE_PALACE);
        break;

      default:
        price.setAttribute(`min`, Prices.MIN_PRICE_BUNGALOW);
        break;
    }
    price.reportValidity();
  };

  const validPrice = () => {
    switch (type.value) {
      case `flat`:
        price.placeholder = Placeholders.PLACEHOLDER_FLAT;
        break;
      case `house`:
        price.placeholder = Placeholders.PLACEHOLDER_HOUSE;
        break;
      case `palace`:
        price.placeholder = Placeholders.PLACEHOLDER_PALACE;
        break;
      default:
        price.placeholder = Placeholders.PLACEHOLDER_BUNGALOW;
        break;
    }
  };

  const validTime = () => {
    switch (timein.value) {
      case `12:00`:
        timeout.value = `12:00`;
        break;
      case `13:00`:
        timeout.value = `13:00`;
        break;
      case `14:00`:
        timeout.value = `14:00`;
        break;
    }
  };

  const validCapacity = () => {
    switch (roomNumber.value) {
      case `1`:
        if (capacity.value === `1`) {
          capacity.setCustomValidity(``);
        } else {
          capacity.setCustomValidity(`Подходит только для 1 гостя`);
        }
        break;
      case `2`:
        if ((capacity.value === `1`) || (capacity.value === `2`)) {
          capacity.setCustomValidity(``);
        } else {
          capacity.setCustomValidity(`Подходит только для 1 или 2 гостей`);
        }
        break;
      case `3`:
        if ((capacity.value === `1`) || (capacity.value === `2`) || (capacity.value === `3`)) {
          capacity.setCustomValidity(``);
        } else {
          capacity.setCustomValidity(`Подходит для 1, 2 или 3 гостей`);
        }
        break;
      case `100`:
        if (capacity.value === `0`) {
          capacity.setCustomValidity(``);
        } else {
          capacity.setCustomValidity(`Не подходит для гостей`);
        }
        break;
      default:
        capacity.setCustomValidity(``);
        break;
    }
    roomNumber.reportValidity();
    capacity.reportValidity();
  };

  const updateAddressValue = () => {
    window.elements.address.value = `${parseInt(window.elements.mainPin.offsetLeft + window.elements.PinSpecification.PIN_WIDTH / 2, 10)}, ${parseInt(window.elements.mainPin.offsetTop + window.elements.PinSpecification.MAX_PIN_HEIGHT, 10)}`;
  };

  price.addEventListener(`input`, () => {
    validPriceMinimum(type.value);
  });

  type.addEventListener(`change`, () => {
    validPrice();
    validPriceMinimum(type.value);
  });

  timein.addEventListener(`change`, () => {
    validTime();
  });

  roomNumber.addEventListener(`change`, () => {
    validCapacity();
  });

  capacity.addEventListener(`change`, () => {
    validCapacity();
  });

  const onSuccessUpload = () => {
    window.util.showSuccessMessage();
    window.elements.map.classList.add(`map--faded`);
    window.elements.adForm.classList.add(`ad-form--disabled`);
  };

  window.elements.adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    validCapacity();
    validPriceMinimum();

    if (capacity.validity.valid && price.validity.valid) {
      window.upload.upload(new FormData(window.elements.adForm), onSuccessUpload, window.util.showErrorMessage);
    }
  });

  adFormReset.addEventListener(`click`, () => {
    window.util.getInactive();
  });

  adFormReset.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.util.getInactive();
    }
  });

  window.form = {
    updateAddressValue
  };

})();
