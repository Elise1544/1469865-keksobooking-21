'use strict';

(function () {

  window.renderPin = function (offer, offerIndex) {
    const pin = document.querySelector(`#pin`);
    let advertElement = pin.content.cloneNode(true);
    let advertPin = advertElement.querySelector(`button`);
    advertPin.dataset.offerIndex = offerIndex;
    let advertAvatar = advertElement.querySelector(`img`);

    advertPin.style.left = `${offer.location.x - window.PIN_WIDTH / 2}px`;
    advertPin.style.top = `${offer.location.y - window.PIN_HEIGHT}px`;
    advertAvatar.src = offer.author.avatar;
    advertAvatar.alt = offer.offer.title;

    return advertElement;
  };

})();
