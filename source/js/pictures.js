'use strict';

// --- Константы ---
var PICTURES_NUM = 25;
var LIKES_NUM = [15, 200];
var COMMENTS_NUM = [1, 20];
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

// --- Функции ---
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

// --- Старт ---
var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var pictures = getPictures(PICTURES_NUM);
picturesContainer.appendChild(renderPictures(pictures));

var pictureModal = document.querySelector('.big-picture');
pictureModal.classList.remove('hidden');

pictureModal.querySelector('.big-picture__img img').src = pictures[0].url;
pictureModal.querySelector('.likes-count').textContent = pictures[0].likes;
pictureModal.querySelector('.comments-count').textContent = pictures[0].comments.length;
pictureModal.querySelector('.social__caption').textContent = pictures[0].description;
pictureModal.querySelector('.social__comment-count').classList.add('visually-hidden');
pictureModal.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
var avatarSrc = commentTemplate.querySelector('.social__picture').src;
var comments = pictures[0].comments;

var fragment = document.createDocumentFragment();

for (var i = 0; i < comments.length; i++) {
  var commentElem = commentTemplate.cloneNode(true);

  commentElem.querySelector('.social__picture').src = avatarSrc.replace('1', getRandomInt(1, 6));
  commentElem.querySelector('.social__text').textContent = comments[i];

  fragment.appendChild(commentElem);
}

commentsList.appendChild(fragment);
