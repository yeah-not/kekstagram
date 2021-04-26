'use strict';

// --------------
// Попап загрузки изображения
// --------------
// Зависимости: util

(function() {
  var FILE_TYPES = ['image/jpeg', 'image/png'];
  var ERROR_MISS_TYPE = 'Поддерживаются форматы JPG и PNG';

  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var image = popup.querySelector('.img-upload__preview img');
  var fileChooser = document.querySelector('#upload-file');

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var open = function() {
    upload.onOpen();
    document.addEventListener('keydown', onEscPress);
    window.util.show(popup);
  };

  var close = function() {
    window.util.hide(popup);
    document.removeEventListener('keydown', onEscPress);
    upload.onClose();
  };

  fileChooser.addEventListener('change', function() {
    var file = fileChooser.files[0];

    var matches = FILE_TYPES.some(function(it) {
      return file.type === it;
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        image.src = reader.result;
        open();
      });

      reader.readAsDataURL(file);
    } else {
      window.message.show(ERROR_MISS_TYPE, 'error');
    }
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
