'use strict';

// --------------
//  Взаимодействие с сервером
// --------------
// Зависимости: message

(function() {
  var Url = {
    POST: 'https://23.javascript.pages.academy/kekstagram',
    GET: 'https://23.javascript.pages.academy/kekstagram/data'
  };

  var CODE_SUCCESS = 200;

  var codeToMessage = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не дайдено',
    500: 'Ошибка сервера',
    default: 'Ошибка'
  };

  var Error = {
    SERVER: 'Ошибка соединения с сервером',
    TIMEOUT: 'Запрос не успел выполниться за ',
    TIMEOUT_PAST: ' мс'
  };

  var onErrorDefault = function(error) {
    window.message.show(error, 'error');
  };

  var createXHR = function(method, url, onLoad, onError, data, timeout) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = timeout || xhr.timeout;

    xhr.addEventListener('load', function() {
      if (xhr.status !== CODE_SUCCESS) {
        onError(xhr.status + ' ' + (codeToMessage[xhr.status] || codeToMessage.default + ': ' + xhr.statusText));
        return;
      }

      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function() {
      onError(xhr.status + ' ' + Error.SERVER);
    });

    xhr.addEventListener('timeout', function() {
      onError(Error.TIMEOUT + xhr.timeout + Error.TIMEOUT_PAST);
    });

    xhr.open(method, url);
    xhr.send();
  };

  window.backend = {
    load: function(onLoad, onError) {
      // createXHR('GET', Url.GET, onLoad, onError, null, 500);
      createXHR('GET', Url.GET, onLoad, onError);
    },
    upload: function(data, onLoad, onError) {
      onError = onError || onErrorDefault;
      createXHR('POST', Url.POST, onLoad, onError, data);
    }
  };
})();
