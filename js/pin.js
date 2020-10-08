'use strict';

(function () {
  const mapPins = document.querySelector(`.map__pins`);

  window.createPins = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(window.renderPopup(offers[i]));
    }
    mapPins.appendChild(fragment);
  };

})();
