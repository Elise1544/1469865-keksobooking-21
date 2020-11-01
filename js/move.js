'use strict';

(function () {

  const MAP_MIN_WIDTH = 0;
  const MAP_MAX_WIDTH = 1200;
  const MAP_MIN_HEIGTH = 130;
  const MAP_MAX_HEIGHT = 630;

  const MIN_Y = MAP_MIN_HEIGTH - window.MAX_PIN_HEIGHT;
  const MAX_Y = MAP_MAX_HEIGHT - window.MAX_PIN_HEIGHT;
  const MIN_X = MAP_MIN_WIDTH - window.PIN_WIDTH / 2;
  const MAX_X = MAP_MAX_WIDTH - window.PIN_WIDTH / 2;

  window.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    const {left, top} = window.map.getBoundingClientRect();

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const limitY = moveEvt.clientY - top - window.PIN_WIDTH / 2;
      const limitX = moveEvt.clientX - left - window.PIN_WIDTH / 2;

      if (limitY > MIN_Y && limitY < MAX_Y) {
        window.mainPin.style.top = `${limitY}px`;
      }
      if (limitX > MIN_X && limitX < MAX_X) {
        window.mainPin.style.left = `${limitX}px`;
      }
      window.updateAddressValue();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.updateAddressValue();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
