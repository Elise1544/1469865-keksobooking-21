'use strict';

(function () {

  const DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  window.debounce = function (cb) {
    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
