'use strict';

// --------------
// Попап
// --------------
// Зависимости: util

(function() {
  var ELEMENT = document.querySelector('.popup');

  var popup;
  var popupClose;
  var onClose;
  var onOpen;

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var onPopupCloseClick = function() {
    close();
  };

  var close = function() {
    window.util.hide(popup);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onPopupCloseClick);

    onClose();
  };

  window.popup = {
    open: function(element, onCloseCB, onOpenCB) {
      popup = element || ELEMENT;
      popupClose = popup.querySelector('.popup__close');

      onClose = onCloseCB || function() {};
      onOpen = onOpenCB || function() {};

      document.addEventListener('keydown', onEscPress);
      popupClose.addEventListener('click', onPopupCloseClick);

      onOpen();
      window.util.show(popup);
    }
  };
})();
