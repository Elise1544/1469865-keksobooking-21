'use strict';

(function () {

  const DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  const debounce = (cb) => {
    return (...parameters) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    debounce
  };

})();
