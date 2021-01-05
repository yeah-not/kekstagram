'use strict';

var PICTURES_NUM = 25;
var LIKES_NUM = [15, 200];
var COMMENTS_NUM = [3, 50];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];


var getRandomEl = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffle = function(array) {
  var j; var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var getComments = function(num) {
  var comments = [];

  for (var i = 0; i < num; i++) {
    comments[i] = getRandomInt(0, 1) ? getRandomEl(COMMENTS) : getRandomEl(COMMENTS) + ' ' + getRandomEl(COMMENTS);
  }

  return comments;
};

var getPictures = function(num) {
  var pictures = [];

  for (var i = 0; i < num; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(LIKES_NUM[0], LIKES_NUM[1]),
      comments: getComments(getRandomInt(COMMENTS_NUM[0], COMMENTS_NUM[1])),
      description: getRandomEl(DESCRIPTIONS),
    };
  }

  return shuffle(pictures);
};

var renderPicture = function(picture) {
  var pictureElem = pictureTemplate.cloneNode(true);

  pictureElem.querySelector('.picture__img').src = picture.url;
  pictureElem.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElem.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElem;
};

var renderPictures = function(pictures) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }

  return fragment;
};

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var pictures = getPictures(PICTURES_NUM);
picturesContainer.appendChild(renderPictures(pictures));
