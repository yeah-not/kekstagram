'use strict';

// Константы
// --------------
var PICTURES_NUM = 25;
var LIKES_NUM = [15, 200];
var COMMENTS_NUM = [1, 20];
var AVATARS_NUM = [1, 6];
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

// Утилиты
// --------------
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

var renderFragment = function(data, renderItem) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderItem(data[i]));
  }

  return fragment;
}

// Функции
// --------------
var generatePictures = function(num) {
  var pictures = [];

  for (var i = 0; i < num; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(LIKES_NUM[0], LIKES_NUM[1]),
      comments: generateComments(getRandomInt(COMMENTS_NUM[0], COMMENTS_NUM[1])),
      description: getRandomEl(DESCRIPTIONS),
    };
  }

  return shuffle(pictures);
};

var generateComments = function(num) {
  var comments = [];

  for (var i = 0; i < num; i++) {
    comments[i] = getRandomInt(0, 1) ? getRandomEl(COMMENTS) : getRandomEl(COMMENTS) + ' ' + getRandomEl(COMMENTS);
  }

  return comments;
};

var generateAvatarSrc = function() {
  var avatarInt = getRandomInt(AVATARS_NUM[0], AVATARS_NUM[1]);
  var avatarSrc = avatarUrl.replace(AVATARS_NUM[0], avatarInt);

  return avatarSrc;
}

var renderPicture = function(data) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__stat--likes').textContent = data.likes;
  picture.querySelector('.picture__stat--comments').textContent = data.comments.length;

  return picture;
};

var renderComment = function(text) {
  var comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = generateAvatarSrc();
  comment.querySelector('.social__text').textContent = text;

  return comment;
}

var fillBigPicture = function(data) {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  commentsList.appendChild(renderFragment(data.comments, renderComment));
};

// Шаблоны
// --------------
var template = document.querySelector('#main-template').content;
var pictureTemplate = template.querySelector('.picture__link');
var commentTemplate = template.querySelector('.social__comment');
var avatarUrl = commentTemplate.querySelector('.social__picture').src;

// Старт
// --------------
var picturesData = generatePictures(PICTURES_NUM);
var pictures = document.querySelector('.pictures');

pictures.appendChild(renderFragment(picturesData, renderPicture));

var bigPicture = document.querySelector('.big-picture');
var commentsList = bigPicture.querySelector('.social__comments');

fillBigPicture(picturesData[0]);
bigPicture.classList.remove('hidden');
