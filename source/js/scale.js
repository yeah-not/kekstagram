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

  var scale;
  var line;
  var pin;
  var levelElem;
  var valueInput;

  var calcLevel = function(shift) {
    var pinLeft = pin.offsetLeft + shift;
    var level = pinLeft / line.offsetWidth * 100;
    return level;
  };

  var setLevel = function(level) {
    var levelCSS = level + '%';
    pin.style.left = levelCSS;
    levelElem.style.width = levelCSS;
  };

  var setValue = function(level) {
    var value = Math.round(level);
    valueInput.value = value;
    return value;
  };

  var onPinMouseDown = function(onChange, evt) {
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var level = calcLevel(shift);

      if (level >= Value.MIN && level <= Value.MAX) {
        setLevel(level);
        onChange(setValue(level));
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
      scale = element || ELEMENT;
      line = scale.querySelector('.scale__line');
      pin = scale.querySelector('.scale__pin');
      levelElem = scale.querySelector('.scale__level');
      valueInput = scale.querySelector('.scale__value');

      pin.addEventListener('mousedown', onPinMouseDown.bind(pin, onChange));
    },
    show: function(element) {
      scale = element || ELEMENT;
      window.util.show(scale);
    },
    hide: function(element) {
      scale = element || ELEMENT;
      window.util.hide(scale);
    },
    reset: function(element) {
      scale = element || ELEMENT;
      pin = scale.querySelector('.scale__pin');
      valueInput = scale.querySelector('.scale__value');
      levelElem = scale.querySelector('.scale__level');

      setValue(Value.DEFAULT);
      setLevel(Value.DEFAULT);
    }
  };
})();
