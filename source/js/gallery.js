'use strict';

// --------------
//  Галерея изображений
// --------------

var pictures = document.querySelector('.pictures');
var picturesData = window.data.generatePictures();

pictures.appendChild(window.util.renderFragment(picturesData, window.picture.render));
