'use strict';

(function () {

  const renderPin = (offer, offerIndex) => {
    const pin = document.querySelector(`#pin`);
    let advertElement = pin.content.cloneNode(true);
    let advertPin = advertElement.querySelector(`button`);
    advertPin.setAttribute(`data-offer-index`, offerIndex);
    let advertAvatar = advertElement.querySelector(`img`);

    advertPin.style.left = `${offer.location.x - window.elements.PinSpecification.PIN_WIDTH / 2}px`;
    advertPin.style.top = `${offer.location.y - window.elements.PinSpecification.PIN_HEIGHT}px`;
    advertAvatar.src = offer.author.avatar;
    advertAvatar.alt = offer.offer.title;

    return advertElement;
  };

  window.map = {
    renderPin
  };

})();
