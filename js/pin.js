'use strict';

(function () {
  window.download(function (data) {
    const mapPins = document.querySelector(`.map__pins`);
    window.offers = data;

    window.createPins = function () {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < window.offers.length; i++) {
        fragment.appendChild(window.renderPopup(window.offers[i]));
      }
      mapPins.appendChild(fragment);
    };
  }, function () {});
})();
