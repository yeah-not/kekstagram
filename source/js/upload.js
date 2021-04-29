'use strict';

// --------------
// Попап загрузки изображения
// --------------
// Зависимости: message, popup

(function() {
  var FILE_TYPES = ['image/jpeg', 'image/png'];
  var ERROR_MISS_TYPE = 'Поддерживаются форматы JPG и PNG';

  var upload = new window.Popup('.img-upload__overlay');

  upload.onOpen = function() {
    window.imageEffect.apply();
  };

  upload.onClose = function() {
    window.uploadForm.reset();
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    upload.close();
  };

  var image = upload.el.querySelector('.img-upload__preview img');
  var fileChooser = document.querySelector('#upload-file');

  fileChooser.addEventListener('change', function() {
    var file = fileChooser.files[0];

    var matches = FILE_TYPES.some(function(it) {
      return file.type === it;
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        image.src = reader.result;
        upload.open();
      });

      reader.readAsDataURL(file);
    } else {
      window.message.show(ERROR_MISS_TYPE, 'error');
    }
  });

  window.upload = upload;
})();
