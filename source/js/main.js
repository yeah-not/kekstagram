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
    window.scale.reset();
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    window.upload.close();
  };

  window.scale.onChange = function(level) {
    window.imageEffect.apply(level);
  };

  window.imageEffect.onSwitch = function() {
    window.scale.reset();
  };

  window.imageEffect.onApply = function(effect) {
    if (effect === 'none') {
      window.scale.hide();
    } else {
      window.scale.show();
    }
  };
})();
