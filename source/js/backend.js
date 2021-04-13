'use strict';

// --------------
//  Взаимодействие с сервером
// --------------
// Зависимости:

(function() {
  var POST_URL = 'https://23.javascript.pages.academy/kekstagram';
  var GET_URL = 'https://23.javascript.pages.academy/kekstagram/data';

  window.backend = {
    load: function(onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.timeout = 5000;

      xhr.addEventListener('load', function() {
        var error = '';

        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос. Статус ответа: ' + xhr.status;
            break;
          case 401:
            error = 'Пользователь не авторизован. Статус ответа: ' + xhr.status;
            break;
          case 404:
            error = 'Ничего не дайдено. Статус ответа: ' + xhr.status;
            break;
          default:
            error = 'Ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function() {
        onError('Ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.open('GET', GET_URL);
      xhr.send();
    },
    upload: function(data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.timeout = 5000;

      xhr.addEventListener('load', function() {
        var error = '';

        switch (xhr.status) {
          case 200:
          // case 500:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос. Статус ответа: ' + xhr.status;
            break;
          case 401:
            error = 'Пользователь не авторизован. Статус ответа: ' + xhr.status;
            break;
          case 404:
            error = 'Ничего не дайдено. Статус ответа: ' + xhr.status;
            break;
          default:
            error = 'Ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          onError(error);
        }

      });

      xhr.addEventListener('error', function() {
        onError('Ошибка соединения с сервером');
      });

      xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.open('POST', POST_URL);
      xhr.send();
    }
  };
})();
