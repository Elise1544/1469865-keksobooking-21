'use strict';

(function () {

  window.elements.mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const {left, top} = window.elements.map.getBoundingClientRect();

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const limitY = moveEvt.clientY - top - window.elements.PinSpecification.PIN_WIDTH / 2;
      const limitX = moveEvt.clientX - left - window.elements.PinSpecification.PIN_WIDTH / 2;

      if (limitY > window.elements.PinLimits.MIN_Y && limitY < window.elements.PinLimits.MAX_Y) {
        window.elements.mainPin.style.top = `${limitY}px`;
      }
      if (limitX > window.elements.PinLimits.MIN_X && limitX < window.elements.PinLimits.MAX_X) {
        window.elements.mainPin.style.left = `${limitX}px`;
      }
      window.form.updateAddressValue();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.form.updateAddressValue();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
