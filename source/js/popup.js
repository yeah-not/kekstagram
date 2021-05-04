'use strict';

// --------------
// Попап
// --------------
// Зависимости: util

var Popup = function(selector) {
  this.el = document.querySelector(selector || this.DEFAULT_SELECTOR);
  this.elClose = this.el.querySelector('.popup__close');
};

Popup.prototype = {
  DEFAULT_SELECTOR: '.popup',
  open: function() {
    this.elClose.addEventListener('click', this._onPopupCloseClick.bind(this));
    document.addEventListener('keydown', this._onEscPress.bind(this));

    this.onOpen();
    window.util.show(this.el);
  },
  close: function() {
    window.util.hide(this.el);

    this.elClose.removeEventListener('click', this._onPopupCloseClick);
    document.removeEventListener('keydown', this._onEscPress);

    this.onClose();
  },
  onOpen: function() {},
  onClose: function() {},
  _onPopupCloseClick: function() {
    this.close();
  },
  _onEscPress: function(evt) {
    window.util.isEscEvent(evt, this.close);
  },
};
