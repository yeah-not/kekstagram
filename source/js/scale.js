'use strict';

// --------------
// Шкала диапазона
// --------------
// Зависимости: нет

(function() {
  var ELEMENT = document.querySelector('.scale');

  var Value = {
    MIN: 0,
    MAX: 100,
    DEFAULT: 100
  };

  var scaleElem;
  var scaleLine;
  var scalePin;
  var scaleLevelElem;
  var scaleValueInput;

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

  var onPinMouseDown = function(onChange, evt) {
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var scaleLevel = calcScaleLevel(shift);

      if (scaleLevel >= Value.MIN && scaleLevel <= Value.MAX) {
        setScaleLevel(scaleLevel);
        onChange(setScaleValue(scaleLevel));
      }
    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.scale = {
    init: function(element, onChange) {
      scaleElem = element || ELEMENT;
      scaleLine = scaleElem.querySelector('.scale__line');
      scalePin = scaleElem.querySelector('.scale__pin');
      scaleLevelElem = scaleElem.querySelector('.scale__level');
      scaleValueInput = scaleElem.querySelector('.scale__value');

      scalePin.addEventListener('mousedown', onPinMouseDown.bind(scalePin, onChange));
    },
    show: function(element) {
      scaleElem = element || ELEMENT;
      window.util.show(scaleElem);
    },
    hide: function(element) {
      scaleElem = element || ELEMENT;
      window.util.hide(scaleElem);
    },
    reset: function(element) {
      scaleElem = element || ELEMENT;
      scalePin = scaleElem.querySelector('.scale__pin');
      scaleValueInput = scaleElem.querySelector('.scale__value');
      scaleLevelElem = scaleElem.querySelector('.scale__level');

      setScaleValue(Value.DEFAULT);
      setScaleLevel(Value.DEFAULT);
    }
  };
})();
