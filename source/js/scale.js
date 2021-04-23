'use strict';

// --------------
// Шкала диапазона
// --------------
// Зависимости: нет

(function() {
  var Value = {
    MIN: 0,
    MAX: 100,
    DEFAULT: 100
  };

  var scaleElem = document.querySelector('.scale');
  var scaleLine = scaleElem.querySelector('.scale__line');
  var scalePin = scaleElem.querySelector('.scale__pin');
  var scaleLevelElem = scaleElem.querySelector('.scale__level');
  var scaleValueInput = scaleElem.querySelector('.scale__value');

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

      if (scaleLevel >= Value.MIN && scaleLevel <= Value.MAX) {
        setScaleLevel(scaleLevel);
        scale.onChange(setScaleValue(scaleLevel));
      }

    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var scale = {
    show: function() {
      window.util.show(scaleElem);
    },
    hide: function() {
      window.util.hide(scaleElem);
    },
    reset: function() {
      setScaleValue(Value.DEFAULT);
      setScaleLevel(Value.DEFAULT);
    },
    onChange: function(level) {
      return level;
    }
  };

  window.scale = scale;
})();
