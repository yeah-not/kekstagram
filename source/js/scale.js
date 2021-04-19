'use strict';

// --------------
// Шкала диапазона
// --------------
// Зависимости: нет

(function() {
  var SCALE_MIN = 0;
  var SCALE_MAX = 100;
  var SCALE_DEFAULT = SCALE_MAX;

  var scale = document.querySelector('.scale');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLevelElem = scale.querySelector('.scale__level');
  var scaleValueInput = scale.querySelector('.scale__value');

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

  scalePin.addEventListener('mousedown', function(evt) {
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var scaleLevel = calcScaleLevel(shift);

      if (scaleLevel >= SCALE_MIN && scaleLevel <= SCALE_MAX) {
        setScaleLevel(scaleLevel);
        window.scale.onChange(setScaleValue(scaleLevel));
      }

    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.scale = {
    show: function() {
      scale.classList.remove('hidden');
    },
    hide: function() {
      scale.classList.add('hidden');
    },
    reset: function() {
      setScaleValue(SCALE_DEFAULT);
      setScaleLevel(SCALE_DEFAULT);
    },
    onChange: function() {}
  };
})();
