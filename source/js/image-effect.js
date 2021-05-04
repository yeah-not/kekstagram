'use strict';

// --------------
// Наложение эффекта на изображение
// --------------
// Зависимости: scale

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
  };

  var scale = new window.Scale('.img-upload__scale');

  scale.onUpdate = function(level) {
    apply(level);
  };

  var controls = document.querySelector('.effects');

  controls.addEventListener('change', function(evt) {
    var effect = evt.target.value;

    apply(EFFECT_LEVEL_DEFAULT, effect);

    scale.reset();

    if (effect === 'none') {
      scale.hide();
    } else {
      scale.show();
    }
  });

  window.imageEffect = {
    apply: apply,
    reset: function() {
      image.classList.remove('effects__preview--' + currentEffect);
      image.style.filter = '';
      currentEffect = '';

      scale.reset();
      scale.show();
    }
  };
})();
