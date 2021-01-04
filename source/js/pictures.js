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

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');


for (var i = 0; i < PICTURES_NUM; i++) {
  var pictureElem = pictureTemplate.cloneNode(true);

  pictureElem.querySelector('.picture__img').src = pictures[0].url;
  pictureElem.querySelector('.picture__stat--likes').textContent = pictures[0].likes;
  pictureElem.querySelector('.picture__stat--comments').textContent = pictures[0].comments.length;

  picturesContainer.appendChild(pictureElem);
}
