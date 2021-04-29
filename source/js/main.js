'use strict';

// Главный модуль
// --------------
// Зависимости: остальные модули

(function() {

  window.upload.onOpen = function() {
    window.imageEffect.apply();
  };

  window.upload.onClose = function() {
    window.uploadForm.reset();
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    window.upload.close();
  };
})();
