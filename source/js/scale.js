'use strict';

// --------------
// Шкала диапазона
// --------------
// Зависимости: нет

var Scale = function(selector, value) {
  this.value = value || this.Value.DEFAULT;

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
  update: function(level, noCallBack) {
    this._updateLevel(level);
    this._setValue(level);
    this.elValue.value = this.value;

    if (!noCallBack) {
      this.onUpdate(this.value);
    }
  },
  reset: function() {
    this.update(this.Value.DEFAULT, true);
  },
  show: function() {
    window.util.show(this.el);
  },
  hide: function() {
    window.util.hide(this.el);
  },
  onUpdate: function(value) {
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
  _setValue: function(level) {
    this.value = Math.round(level);
  },
  _onPinMouseDown: function(evt) {
    var self = this;
    var startX = evt.clientX;

    var onMouseMove = function(moveEvt) {
      var shift = moveEvt.clientX - startX;
      startX = moveEvt.clientX;

      var level = self._calcLevel(shift);

      if (level >= self.Value.MIN && level <= self.Value.MAX) {
        self.update(level);
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
