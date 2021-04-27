'use strict';

// --------------
//  Вывод информационных сообщений
// --------------
// Зависимости: util, data

(function() {
  var HIDE_TIMEOUT = 3000;
  var HIDE_ANIMATION_TIMEOUT = 500;

  var typeToLabel = {
    'error': 'Ошибка',
    'success': 'Успех',
    'default': 'Инфо'
  };

  var template = window.data.template.querySelector('.message-bar');
  var panel = document.querySelector('.message-panel');

  var hide = function(message) {
    message.classList.add('message-bar--hidden');

    setTimeout(function() {
      message.remove();
    }, HIDE_ANIMATION_TIMEOUT);
  };

  var show = function(text, type) {
    type = type || 'default';

    var message = template.cloneNode(true);
    var label = message.querySelector('.message-bar__label');
    var content = message.querySelector('.message-bar__text');

    message.classList.add('message-bar--' + type);
    label.innerText = typeToLabel[type];
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

    setTimeout(hide, HIDE_TIMEOUT, message);
  };

  window.message = {
    show: show
  };
})();
