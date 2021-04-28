'use strict';

// --------------
// Шкала диапазона
// --------------
// Зависимости: нет

var Scale = function(selector) {
  this.el = document.querySelector(selector || this.DEFAULT_SELECTOR);
  this.elLine = this.el.querySelector('.scale__line');
  this.elPin = this.el.querySelector('.scale__pin');
  this.elLevel = this.el.querySelector('.scale__level');
  this.elValue = this.el.querySelector('.scale__value');

  this.elPin.addEventListener('mousedown', this._onPinMouseDown.bind(this));
};

Scale.prototype = {
  DEFAULT_SELECTOR: '.scale',
  Value: {
    MIN: 0,
    MAX: 100,
    DEFAULT: 100
  },
  setValue: function(level) {
    var value = Math.round(level);
    this.elValue.value = value;
    return value;
  },
  show: function() {
    window.util.show(this.el);
  },
  hide: function() {
    window.util.hide(this.el);
  },
  reset: function() {
    this.setValue(this.Value.DEFAULT);
    this._updateLevel(this.Value.DEFAULT);
  },
  onChange: function(value) {
    return value;
  },
  _calcLevel: function(shift) {
    var pinLeft = this.elPin.offsetLeft + shift;
    var level = pinLeft / this.elLine.offsetWidth * 100;
    return level;
  },
  _updateLevel: function(level) {
    var levelCSS = level + '%';
    this.elPin.style.left = levelCSS;
    this.elLevel.style.width = levelCSS;
  },
  _onPinMouseDown: function(evt) {
    var self = this;
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var level = self._calcLevel(shift);

      if (level >= self.Value.MIN && level <= self.Value.MAX) {
        self._updateLevel(level);
        self.onChange(self.setValue(level));
      }
    };

    var onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
};
