'use strict';

// --------------
//  Взаимодействие с сервером
// --------------
// Зависимости: message

(function() {
  var POST_URL = 'https://23.javascript.pages.academy/kekstagram';
  var GET_URL = 'https://23.javascript.pages.academy/kekstagram/data';

  var ERROR_400 = 'Неверный запрос ';
  var ERROR_401 = 'Пользователь не авторизован ';
  var ERROR_404 = 'Ничего не дайдено ';
  var ERROR_500 = 'Ошибка сервера ';
  var ERROR_SERVER = 'Ошибка соединения с сервером ';
  var ERROR_TIMEOUT = 'Запрос не успел выполниться за ';
  var ERROR_TIMEOUT_PAST = ' мс';
  var ERROR_DEFAULT = 'Ошибка ';

  var onErrorDefault = function(error) {
    window.message.show(error, 'error');
  };

  var createXHR = function(method, url, onLoad, onError, data, timeout) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = timeout || xhr.timeout;

    xhr.addEventListener('load', function() {
      var error = '';

      switch (xhr.status) {
        case 200:
        // case 500:
          onLoad(xhr.response);
          break;
        case 400:
          error = ERROR_400 + xhr.status + '.';
          break;
        case 401:
          error = ERROR_401 + xhr.status + '.';
          break;
        case 404:
          error = ERROR_404 + xhr.status + '.';
          break;
        case 500:
          error = ERROR_500 + xhr.status + '.';
          break;
        default:
          error = ERROR_DEFAULT + xhr.status + ' ' + xhr.statusText + '.';
      }

      if (error) {
        onError(error);
      }

    });

    xhr.addEventListener('error', function() {
      onError(ERROR_SERVER + xhr.status + '.');
    });

    xhr.addEventListener('timeout', function() {
      onError(ERROR_TIMEOUT + xhr.timeout + ERROR_TIMEOUT_PAST + '.');
    });

    xhr.open(method, url);
    xhr.send();
  };

  window.backend = {
    load: function(onLoad, onError) {
      // createXHR('GET', GET_URL, onLoad, onError, null, 3000);
      createXHR('GET', GET_URL, onLoad, onError);
    },
    upload: function(data, onLoad, onError) {
      onError = onError || onErrorDefault;
      createXHR('POST', POST_URL, onLoad, onError, data);
    }
  };
})();
