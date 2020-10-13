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

})();
