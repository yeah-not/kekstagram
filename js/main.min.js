'use strict';

// Главный модуль
// --------------
// Зависимости: остальные модули

(function() {
  var effectScale = document.querySelector('.scale');

  window.scale.init(effectScale, function(level) {
    window.imageEffect.apply(level);
  });

  window.imageEffect.onSwitch = function() {
    window.scale.reset(effectScale);
  };

  window.imageEffect.onApply = function(effect) {
    if (effect === 'none') {
      window.scale.hide(effectScale);
    } else {
      window.scale.show(effectScale);
    }
  };

  window.upload.onOpen = function() {
    window.imageEffect.apply();
  };

  window.upload.onClose = function() {
    window.uploadForm.reset();
    window.scale.reset(effectScale);
    window.imageEffect.reset();
    window.imageSize.reset();
  };

  window.uploadForm.onSend = function() {
    window.upload.close();
  };
})();
