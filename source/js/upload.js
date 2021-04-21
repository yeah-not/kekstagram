'use strict';

// --------------
// Попап загрузки изображения
// --------------
// Зависимости: util

(function() {
  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var popupOpen = document.querySelector('#upload-file');

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var open = function() {
    upload.onOpen();

    document.addEventListener('keydown', onEscPress);
    popup.classList.remove('hidden');
  };

  var close = function() {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);

    upload.onClose();
  };

  popupOpen.addEventListener('change', function() {
    open();
  });

  popupClose.addEventListener('click', function() {
    close();
  });

  var upload = {
    close: close,
    onOpen: function() {},
    onClose: function() {}
  };

  window.upload = upload;
})();
