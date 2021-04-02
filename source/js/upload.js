'use strict';

// --------------
// Попап загрузки изображения
// --------------

(function() {
  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var popupOpen = document.querySelector('#upload-file');

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var open = function() {
    document.addEventListener('keydown', onEscPress);
    popup.classList.remove('hidden');
  };

  var close = function() {
    popup.classList.add('hidden');

    window.uploadForm.reset();
    window.imageSize.reset();
    window.imageEffect.reset();

    document.removeEventListener('keydown', onEscPress);
  };

  popupOpen.addEventListener('change', function() {
    open();
  });

  popupClose.addEventListener('click', function() {
    close();
  });
})();
