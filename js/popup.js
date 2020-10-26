'use strict';

(function () {

  window.addPopups = function (popupsArray, pinsArray) {
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.offers.length; i++) {
      window.card[i].addEventListener(`click`, function () {
        fragment.appendChild(window.openPopup(popupsArray[i]));
        mapFiltersContainer.before(fragment);
      })
    }
    // for (let i = 0; i < popupsArray.length; i++) {
    // window.popup = fragment;
    // }
    // fragment.style.display = `none`;
  };
  // debugger;
  // const popup = window.addPopups(window.offers);
  // const popupArray = document.querySelectorAll(`.popup`);
  // const buttonClose = document.querySelectorAll(`.popup__close`);
  // popupArray.forEach.style.display = `none`;

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
