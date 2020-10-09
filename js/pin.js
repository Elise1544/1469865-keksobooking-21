'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);

  window.createPins = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < window.offers.length; i++) {
      fragment.appendChild(window.renderPopup(window.offers[i]));
    }
    mapPins.appendChild(fragment);
  };

})();
