'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, message, backend, picture, preview

(function() {
  var ERROR_LOAD = 'Изображения не загружены. ';

  var pictures = document.querySelector('.pictures');

  var render = function(data) {
    // data = window.data.generatePictures();
    // Вариант 1 - IIFE-обход потери окружения
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var picture = window.picture.render(data[i]);

      (function(pictureElem, pictureData) {
        pictureElem.addEventListener('click', function() {
          window.preview.open(pictureData);
        });
      })(picture, data[i]);

      fragment.appendChild(picture);
    }

    // Вариант 2 - обработчик передается как callback
    // var onPictureClick = function(picture, data) {
    //   picture.addEventListener('click', function() {
    //     window.preview.open(data);
    //   });
    // }
    //
    // var fragment = window.util.renderFragment(data, window.picture.render, onPictureClick)
    pictures.appendChild(fragment);
  };

  var onLoad = function(data) {
    render(data);
  };

  var onError = function(error) {
    window.message.show(ERROR_LOAD + error, 'error');
  };

  window.backend.load(onLoad, onError);
})();
