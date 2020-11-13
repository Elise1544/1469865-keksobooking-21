'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const TIMEOUT_IN_MS = 10000;

  const download = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);
    xhr.addEventListener(`load`, () => {
      let error;
      const {status, response, statusText} = xhr;
      switch (status) {
        case window.elements.Codes.OK:
          onSuccess(response);
          break;
        case window.elements.Codes.PAGE_MOVED:
          error = `Страница была временно перемещена`;
          break;
        case window.elements.Codes.NOT_FOUND:
          error = `Не найдено`;
          break;
        case window.elements.Codes.SERVER_ERROR:
          error = `Ошибка сервера`;
          break;
        default:
          error = `Статус ответа: ${status} ${statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  window.download = {
    download
  };

})();
