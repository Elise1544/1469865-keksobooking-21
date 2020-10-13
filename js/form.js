'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapFiltersElements = document.querySelectorAll(`.map__filter`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const address = adForm.querySelector(`#address`);

  mapFilters.setAttribute(`disabled`, `disabled`);
  for (let mapFiltersElement of mapFiltersElements) {
    mapFiltersElement.setAttribute(`disabled`, `disabled`);
  }

  window.getActive = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    mapFilters.removeAttribute(`disabled`);

    for (let mapFiltersElement of mapFiltersElements) {
      mapFiltersElement.removeAttribute(`disabled`);
    }
  };

  const getPriceMinimum = function () {
    if (type.value === `flat`) {
      price.setAttribute(`min`, `1000`);
    } else if (type.value === `house`) {
      price.setAttribute(`min`, `5000`);
    } else if (type.value === `palace`) {
      price.setAttribute(`min`, `10000`);
    } else {
      price.setAttribute(`min`, `0`);
    }
    price.reportValidity();
  };

  const getPrice = function () {
    if (type.value === `flat`) {
      price.placeholder = `5000`;
    } else if (type.value === `house`) {
      price.placeholder = `10000`;
    } else if (type.value === `palace`) {
      price.placeholder = `20000`;
    } else {
      price.placeholder = `1000`;
    }
  };

  const getTime = function () {
    if (timein.value === `12:00`) {
      timeout.value = `12:00`;
    } else if (timein.value === `13:00`) {
      timeout.value = `13:00`;
    } else {
      timeout.value = `14:00`;
    }
  };

  const getCapacity = function () {
    if (roomNumber.value === `1`) {
      if (capacity.value === `1`) {
        capacity.setCustomValidity(``);
      } else {
        capacity.setCustomValidity(`Подходит только для 1 гостя`);
      }
    } else if (roomNumber.value === `2`) {
      if ((capacity.value === `1`) || (capacity.value === `2`)) {
        capacity.setCustomValidity(``);
      } else {
        capacity.setCustomValidity(`Подходит только для 1 или 2 гостей`);
      }
    } else if (roomNumber.value === `3`) {
      if ((capacity.value === `1`) || (capacity.value === `2`) || (capacity.value === `3`)) {
        capacity.setCustomValidity(``);
      } else {
        capacity.setCustomValidity(`Подходит для 1, 2 или 3 гостей`);
      }
    } else if (roomNumber.value === `100`) {
      if (capacity.value === `0`) {
        capacity.setCustomValidity(``);
      } else {
        capacity.setCustomValidity(`Не подходит для гостей`);
      }
    }
    capacity.reportValidity();
  };

  // const getAddress = function () {
  address.value = mainPin.style.left + `, ` + mainPin.style.top;
  // };

  price.addEventListener(`input`, function () {
    getPriceMinimum(type.value);
  });

  type.addEventListener(`change`, function () {
    getPrice();
  });

  timein.addEventListener(`change`, function () {
    getTime();
  });

  capacity.addEventListener(`change`, function () {
    getCapacity();
  });
})();
