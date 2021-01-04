'use strict';

var PICTURES_NUM = 25;

var pictures = [
  {
    url: 'photos/1.jpg',
    likes: 15,
    comments: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.'
    ],
    description: 'Тестим новую камеру!'
  }
];

var renderPicture = function(picture) {
  var pictureElem = pictureTemplate.cloneNode(true);

  pictureElem.querySelector('.picture__img').src = picture.url;
  pictureElem.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElem.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElem;
}

var renderPictures = function(pictures) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PICTURES_NUM; i++) {
    fragment.appendChild(renderPicture(pictures[0]));
  }

  return fragment;
}

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

picturesContainer.appendChild(renderPictures(pictures));
