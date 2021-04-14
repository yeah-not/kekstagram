'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, message, backend, picture

(function() {
  var ERROR_LOAD = 'Изображения не загружены. ';

  var pictures = document.querySelector('.pictures');

  var onLoad = function(data) {
    // data = window.data.generatePictures();
    pictures.appendChild(window.util.renderFragment(data, window.picture.render));
  };

  var onError = function(error) {
    window.message.show(ERROR_LOAD + error, 'error');
  };

  window.backend.load(onLoad, onError);
})();
