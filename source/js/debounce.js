'use strict';

// --------------
//  Устранение "дребезга"
// --------------
// Зависимости: нет

(function() {
  var INTERVAL_DEFAULT = 500; // ms
  var lastTimeout;

  window.debounce = function(action, interval) {
    interval = interval || INTERVAL_DEFAULT;
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(action, interval);
  };
})();
