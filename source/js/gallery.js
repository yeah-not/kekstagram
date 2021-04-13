'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, backend, picture

var pictures = document.querySelector('.pictures');

var onLoad = function(data) {
  // data = window.data.generatePictures();
  pictures.appendChild(window.util.renderFragment(data, window.picture.render));
};

var onError = function(error) {
  console.log(error);
};

window.backend.load(onLoad, onError);
