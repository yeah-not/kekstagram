'use strict';

// --------------
//  Вывод информационных сообщений
// --------------
// Зависимости: util, data

(function() {
  var TIMEOUT_HIDE = 3000;
  var TIMEOUT_HIDE_ANIMATION = 500;

  var template = window.data.template.querySelector('.message-bar');
  var panel = document.querySelector('.message-panel');

  var hide = function(message) {
    message.classList.add('message-bar--hidden');

    setTimeout(function() {
      message.remove();
    }, TIMEOUT_HIDE_ANIMATION);
  };

  window.message = {
    show: function(text, type) {
      type = type || 'default';

      var message = template.cloneNode(true);
      var label = message.querySelector('.message-bar__label');
      var content = message.querySelector('.message-bar__text');
      var labelText = '';

      switch (type) {
        case 'error':
          labelText = 'Ошибка';
          break;
        case 'success':
          labelText = 'Успех';
          break;
        default:
          labelText = 'Инфо';
      }

      message.classList.add('message-bar--' + type);
      label.innerText = labelText;
      content.innerText = text;

      document.addEventListener('keydown', function(evt) {
        window.util.isEscEvent(evt, function() {
          hide(message);
        });
      });

      message.addEventListener('click', function() {
        hide(message);
      });

      panel.appendChild(message);

      setTimeout(hide, TIMEOUT_HIDE, message);
    }
  };
})();
