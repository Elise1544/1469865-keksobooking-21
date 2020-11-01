'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  let codes = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    TIMEOUT: 524
  };
  const TIMEOUT_IN_MS = 10000;
  window.download = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);
    xhr.addEventListener(`load`, function () {
      if (xhr.status === codes.OK) {
        onSuccess(xhr.response);
      } else {
        window.onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

})();
