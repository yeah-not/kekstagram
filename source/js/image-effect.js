'use strict';

// --------------
// Наложение эффекта на изображение
// --------------
// Зависимости: нет

(function() {
  var EFFECT_DEFAULT = 'heat';
  var EFFECT_LEVEL_DEFAULT = 100;

  var image = document.querySelector('.img-upload__preview img');
  var currentEffect = '';

  var apply = function(level, effect) {
    if (isNaN(level)) {
      level = EFFECT_LEVEL_DEFAULT;
    }

    effect = effect || EFFECT_DEFAULT;

    if (currentEffect && currentEffect !== effect) {
      image.classList.remove('effects__preview--' + currentEffect);
      image.classList.add('effects__preview--' + effect);
    }

    var filter = '';

    switch (effect) {
      case 'chrome' :
        filter = 'grayscale(' + (level / 100) + ')';
        break;
      case 'sepia' :
        filter = 'sepia(' + (level / 100) + ')';
        break;
      case 'marvin' :
        filter = 'invert(' + level + '%)';
        break;
      case 'phobos' :
        filter = 'blur(' + (level * 5 / 100) + 'px)';
        break;
      case 'heat' :
        filter = 'brightness(' + (level * 2 / 100 + 1) + ')';
        break;
    }

    image.style.filter = filter;
    currentEffect = effect;

    window.imageEffect.onApply(effect);
  };

  var effectControls = document.querySelector('.effects');

  effectControls.addEventListener('change', function(evt) {
    apply(EFFECT_LEVEL_DEFAULT, evt.target.value);
    window.imageEffect.onSwitch();
  });

  window.imageEffect = {
    apply: apply,
    onSwitch: function() {},
    onApply: function() {}
  };
})();
