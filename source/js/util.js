'use strict';

// --------------
// Утилиты
// --------------
// Зависимости: нет

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
    removeChildren: function(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    },
    renderFragment: function(data, renderItem, itemListener) {
      var fragment = document.createDocumentFragment();
      var item = null;

      for (var i = 0; i < data.length; i++) {
        item = renderItem(data[i]);

        if (itemListener) {
          itemListener(item, data[i]);
        }

        fragment.appendChild(item);
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
