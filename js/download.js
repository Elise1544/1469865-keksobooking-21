'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  window.codes = {
    OK: 200,
    PAGE_MOVED: 302,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  const TIMEOUT_IN_MS = 10000;

  window.download = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);
    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case window.codes.OK:
          onSuccess(xhr.response);
          break;
        case window.codes.PAGE_MOVED:
          error = `Страница была временно перемещена`;
          break;
        case window.codes.NOT_FOUND:
          error = `Не найдено`;
          break;
        case window.codes.SERVER_ERROR:
          error = `Ошибка сервера`;
          break;
        default:
          error = `Статус ответа: ` + xhr.status + xhr.statusText;
      }

      if (onError) {
        window.onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      window.onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      window.onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL);
    xhr.send();
  };

})();
