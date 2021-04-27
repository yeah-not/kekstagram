'use strict';

// --------------
// Попап
// --------------
// Зависимости: util

(function() {
  var popupElem;
  var popupClose;

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var close = function(onClose) {
    window.util.hide(popupElem);
    document.removeEventListener('keydown', onEscPress);
    onClose();
  };

  window.popup = {
    open: function(selector, onClose, onOpen) {
      popupElem = document.querySelector(selector || '.popup');
      popupClose = popupElem.querySelector('.popup__close');

      onClose = onClose || function() {};
      onOpen = onOpen || function() {};

      document.addEventListener('keydown', onEscPress);
      popupClose.addEventListener('click', function() {
        close(onClose);
      });

      onOpen();
      window.util.show(popupElem);
    }
  };
})();
