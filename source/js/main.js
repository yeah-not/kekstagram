'use strict';

// Главный модуль
// --------------
// Зависимости: остальные модули

(function() {
  window.upload.onClose = function() {
    window.uploadForm.reset();
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    window.upload.close();
  };
})();
