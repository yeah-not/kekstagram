'use strict';

// --------------
// Попап загрузки изображения
// --------------
// Зависимости: message, popup

(function() {
  var FILE_TYPES = ['image/jpeg', 'image/png'];
  var ERROR_MISS_TYPE = 'Поддерживаются форматы JPG и PNG';

  var uploadElem = document.querySelector('.img-upload__overlay');
  var image = uploadElem.querySelector('.img-upload__preview img');
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
        window.popup.open(uploadElem, upload.onClose, upload.onOpen);
      });

      reader.readAsDataURL(file);
    } else {
      window.message.show(ERROR_MISS_TYPE, 'error');
    }
  });

  var upload = {
    onOpen: function() {},
    onClose: function() {}
  };

  window.upload = upload;
})();
