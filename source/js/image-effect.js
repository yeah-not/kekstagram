'use strict';

// --------------
// Наложение эффекта на изображение
// --------------
// Зависимости: нет

(function() {
  // Шкала диапазона
  // --------------
  var SCALE_MIN = 0;
  var SCALE_MAX = 100;
  var SCALE_DEFAULT = SCALE_MAX;

  var scale = document.querySelector('.scale');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLevelElem = scale.querySelector('.scale__level');
  var scaleValueInput = scale.querySelector('.scale__value');

  var hideScale = function() {
    scale.classList.add('hidden');
  };

  var showScale = function() {
    scale.classList.remove('hidden');
  };

  var calcScaleLevel = function(shift) {
    var pinLeft = scalePin.offsetLeft + shift;
    var level = pinLeft / scaleLine.offsetWidth * 100;

    return level;
  };

  var setScaleLevel = function(level) {
    var levelCSS = level + '%';

    scalePin.style.left = levelCSS;
    scaleLevelElem.style.width = levelCSS;
  };

  var setScaleValue = function(level) {
    var value = Math.round(level);

    scaleValueInput.value = value;

    return value;
  };

  var resetScale = function() {
    setScaleValue(SCALE_DEFAULT);
    setScaleLevel(SCALE_DEFAULT);
  };

  scalePin.addEventListener('mousedown', function(evt) {
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var scaleLevel = calcScaleLevel(shift);

      if (scaleLevel >= SCALE_MIN && scaleLevel <= SCALE_MAX) {
        setScaleLevel(scaleLevel);
        applyEffect(currentEffect, setScaleValue(scaleLevel));
      }

    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Эффект
  // --------------
  var EFFECT_DEFAULT = 'heat';
  var EFFECT_LEVEL_DEFAULT = 100;

  var image = document.querySelector('.img-upload__preview img');
  var selectedEffect = document.querySelector('.effects__radio:checked');
  var currentEffect = '';

  var applyEffect = function(effectName, effectLevel) {
    if (typeof effectLevel === 'undefined') {
      effectLevel = EFFECT_LEVEL_DEFAULT;
    }

    if (currentEffect) {
      image.classList.remove('effects__preview--' + currentEffect);
    }

    image.classList.add('effects__preview--' + effectName);

    if (effectName === 'none') {
      hideScale();
    } else {
      showScale();
    }

    var filter = '';

    switch (effectName) {
      case 'chrome' :
        filter = 'grayscale(' + (effectLevel / 100) + ')';
        break;
      case 'sepia' :
        filter = 'sepia(' + (effectLevel / 100) + ')';
        break;
      case 'marvin' :
        filter = 'invert(' + effectLevel + '%)';
        break;
      case 'phobos' :
        filter = 'blur(' + (effectLevel * 5 / 100) + 'px)';
        break;
      case 'heat' :
        filter = 'brightness(' + (effectLevel * 2 / 100 + 1) + ')';
        break;
    }

    image.style.filter = filter;
    currentEffect = effectName;
  };

  applyEffect(selectedEffect.value);

  var effectControls = document.querySelector('.effects');

  effectControls.addEventListener('change', function(evt) {
    applyEffect(evt.target.value);
    resetScale();
  });

  window.imageEffect = {
    reset: function() {
      resetScale();
      applyEffect(EFFECT_DEFAULT);
    }
  };
})();
