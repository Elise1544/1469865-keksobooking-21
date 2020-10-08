'use strict';

(function () {
  const PIN__WIDTH = 40;
  const PIN__HEIGHT = 44;

  window.renderPopup = function (offer) {
    const pin = document.querySelector(`#pin`);
    let advertElement = pin.content.cloneNode(true);
    let advertPin = advertElement.querySelector(`button`);
    let advertAvatar = advertElement.querySelector(`img`);

    advertPin.style.left = `${offer.location.x + PIN__WIDTH / 2}px`;
    advertPin.style.top = `${offer.location.y + PIN__HEIGHT}px`;
    advertAvatar.src = offer.author.avatar;
    advertAvatar.alt = offer.offer.title;

    return advertElement;
  };
})();
