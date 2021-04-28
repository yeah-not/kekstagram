'use strict';

// Главный модуль
// --------------
// Зависимости: остальные модули

(function() {
  var effectScale = new window.Scale('.img-upload__scale');

  effectScale.onChange = function(level) {
    window.imageEffect.apply(level);
  };

  window.imageEffect.onSwitch = function() {
    effectScale.reset();
  };

  window.imageEffect.onApply = function(effect) {
    if (effect === 'none') {
      effectScale.hide();
    } else {
      effectScale.show();
    }
  };

  window.upload.onOpen = function() {
    window.imageEffect.apply();
  };

  window.upload.onClose = function() {
    window.uploadForm.reset();
    effectScale.reset();
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    window.upload.close();
  };
})();
