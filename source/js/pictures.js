'use strict';

// --------------
//  Миниатюры изображений
// --------------

var renderPicture = function(data) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__stat--likes').textContent = data.likes;
  picture.querySelector('.picture__stat--comments').textContent = data.comments.length;

  picture.addEventListener('click', function() {
    window.preview.open(data);
  });

  return picture;
};

// Старт
// --------------
var template = document.querySelector('#main-template').content;
var pictureTemplate = template.querySelector('.picture__link');

var picturesData = window.data.generatePictures();
var picturesContainer = document.querySelector('.pictures');

picturesContainer.appendChild(window.util.renderFragment(picturesData, renderPicture));
