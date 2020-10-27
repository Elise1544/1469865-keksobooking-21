'use strict';

(function () {

  window.addPopups = function (card, pin) {
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pin.length; i++) {
      pin[i].addEventListener(`click`, function () {
        fragment.appendChild(window.openPopup(card[i]));
        mapFiltersContainer.before(fragment);
      });
    }
    // for (let i = 0; i < popupsArray.length; i++) {
    // window.popup = fragment;
    // }
    // fragment.style.display = `none`;
  };

  // if(buttonClose){
  //   buttonClose.addEventListener(`click`, function() {
  //   // evt.preventDefault();
  //   // popup.classList.add(`visually-hidden`);
  // });
  // }

  // document.addEventListener(`keydown`, function(evt) {
  //   if (evt.key === `Escape`) {
  //     evt.preventDefault();
  //     popup.style.display = `none`;
  //   }
  // })


})();
