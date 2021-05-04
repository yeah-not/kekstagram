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
    renderFragment: function(data, renderEl, handler) {
      var fragment = data.reduce(function(accumlator, elData) {
        var el = renderEl(elData);

        if (handler) {
          handler(el, elData);
        }

        accumlator.appendChild(el);

        return accumlator;
      }, document.createDocumentFragment());

      return fragment;
    },
    renderObjects: function(objects, handler) {
      var fragment = objects.reduce(function(accumlator, obj) {
        var el = obj.render();

        if (handler) {
          handler(el, obj);
        }

        accumlator.appendChild(el);

        return accumlator;
      }, document.createDocumentFragment());

      return fragment;
    },
    show: function(element, visually) {
      var className = visually ? 'visually-hidden' : 'hidden';
      element.classList.remove(className);
    },
    hide: function(element, visually) {
      var className = visually ? 'visually-hidden' : 'hidden';
      element.classList.add(className);
    },
    isEscEvent: function(evt, action) {
      if (evt.code === 'Escape') {
        action();
      }
    }
  };
})();
