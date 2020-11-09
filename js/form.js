'use strict';

(function () {
  window.map = document.querySelector(`.map`);
  window.adForm = document.querySelector(`.ad-form`);
  const adFormReset = window.adForm.querySelector(`.ad-form__reset`);
  const type = window.adForm.querySelector(`#type`);
  window.price = window.adForm.querySelector(`#price`);
  const timein = window.adForm.querySelector(`#timein`);
  const timeout = window.adForm.querySelector(`#timeout`);
  const roomNumber = window.adForm.querySelector(`#room_number`);
  const capacity = window.adForm.querySelector(`#capacity`);
  const address = window.adForm.querySelector(`#address`);

  const validPriceMinimum = function () {
    switch (type.value) {
      case `flat`:
        window.price.setAttribute(`min`, `1000`);
        break;
      case `house`:
        window.price.setAttribute(`min`, `5000`);
        break;
      case `palace`:
        window.price.setAttribute(`min`, `10000`);
        break;
      default:
        window.price.setAttribute(`min`, `0`);
        break;
    }
    window.price.reportValidity();
  };

  const validPrice = function () {
    switch (type.value) {
      case `flat`:
        window.price.placeholder = `5000`;
        break;
      case `house`:
        window.price.placeholder = `10000`;
        break;
      case `palace`:
        window.price.placeholder = `20000`;
        break;
      default:
        window.price.placeholder = `1000`;
        break;
    }
  };

  const validTime = function () {
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

  const validCapacity = function () {
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

  window.updateAddressValue = function () {
    address.value = `${parseInt(window.mainPin.style.left, 10)}, ${parseInt(window.mainPin.style.top, 10)}`;
  };

  window.price.addEventListener(`input`, function () {
    validPriceMinimum(type.value);
  });

  type.addEventListener(`change`, function () {
    validPrice();
  });

  timein.addEventListener(`change`, function () {
    validTime();
  });

  capacity.addEventListener(`change`, function () {
    validCapacity();
  });

  const onSuccessUpload = function () {
    window.showSuccessMessage();
    window.map.classList.add(`map--faded`);
    window.adForm.classList.add(`ad-form--disabled`);
  };

  window.adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    validCapacity();
    validPriceMinimum();

    if (capacity.validity.valid && window.price.validity.valid) {
      window.upload(new FormData(window.adForm), onSuccessUpload, window.showErrorMessage);
    }
  });

  adFormReset.addEventListener(`click`, function () {
    window.getInactive();
  });

  adFormReset.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.getInactive();
    }
  });

})();
