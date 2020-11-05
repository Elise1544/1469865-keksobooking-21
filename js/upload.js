'use strict';
(function () {
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === window.codes.OK) {
        onSuccess(xhr.response);
      } else {
        window.showErrorMessage();
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

})();
