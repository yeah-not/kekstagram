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
    level = level >= 0 ? level : EFFECT_LEVEL_DEFAULT;
    effect = effect || currentEffect || EFFECT_DEFAULT;

    if (currentEffect && currentEffect !== effect) {
      image.classList.remove('effects__preview--' + currentEffect);
      image.classList.add('effects__preview--' + effect);
    }

    var effectToFilter = {
      'chrome': 'grayscale(' + (level / 100) + ')',
      'sepia': 'sepia(' + (level / 100) + ')',
      'marvin': 'invert(' + level + '%)',
      'phobos': 'blur(' + (level * 5 / 100) + 'px)',
      'heat': 'brightness(' + (level * 2 / 100 + 1) + ')'
    };

    image.style.filter = effectToFilter[effect] || '';
    currentEffect = effect;

    imageEffect.onApply(effect);
  };

  var effectControls = document.querySelector('.effects');

  effectControls.addEventListener('change', function(evt) {
    apply(EFFECT_LEVEL_DEFAULT, evt.target.value);
    imageEffect.onSwitch();
  });

  var imageEffect = {
    apply: apply,
    reset: function() {
      currentEffect = '';
    },
    onSwitch: function() {},
    onApply: function(effect) {
      return effect;
    }
  };

  window.imageEffect = imageEffect;
})();
