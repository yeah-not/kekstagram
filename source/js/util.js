'use strict';

// --------------
// Утилиты
// --------------

(function() {
  window.util = {
    getRandomEl: function(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle: function(array) {
      var j; var temp;

      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }

      return array;
    },
    renderFragment: function(data, renderItem) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(renderItem(data[i]));
      }

      return fragment;
    },
    isEscEvent: function(evt, action) {
      if (evt.code === 'Escape') {
        action();
      }
    }
  };
})();
