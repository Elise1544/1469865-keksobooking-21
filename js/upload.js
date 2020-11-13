'use strict';
(function () {
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === window.elements.Codes.OK) {
        onSuccess(xhr.response);
      } else {
        window.util.showErrorMessage();
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  window.upload = {
    upload
  };

})();
