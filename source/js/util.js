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
    removeChildren: function(element, childSelector) {
      childSelector = childSelector || '*';

      while (element.querySelector(childSelector)) {
        element.removeChild(element.querySelector(childSelector));
      }
    },
    renderFragment: function(data, renderItem, itemHandler) {
      var fragment = document.createDocumentFragment();

      data.forEach(function(itemData) {
        var item = renderItem(itemData);

        if (itemHandler) {
          itemHandler(item, itemData);
        }

        fragment.appendChild(item);
      });

      return fragment;
    },
    isEscEvent: function(evt, action) {
      if (evt.code === 'Escape') {
        action();
      }
    }
  };
})();
