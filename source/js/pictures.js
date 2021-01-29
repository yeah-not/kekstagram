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
};

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
};

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
};

var fillBigPicture = function(data) {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  commentsList.appendChild(renderFragment(data.comments, renderComment));
};

var openUploadPopup = function() {
  document.addEventListener('keydown', onUploadPopupEscPress);
  uploadPopup.classList.remove('hidden');
};

var closeUploadPopup = function() {
  uploadPopup.classList.add('hidden');
  uploadForm.reset();
  document.removeEventListener('keydown', onUploadPopupEscPress);
};

var applyImageEffect = function(effectName) {
  if (currentEffect) {
    imgPreview.classList.remove('effects__preview--' + currentEffect);
  }

  imgPreview.classList.add('effects__preview--' + effectName);

  if (effectName === 'none') {
    scale.classList.add('hidden');
  } else {
    scale.classList.remove('hidden');
  }

  scaleValueInput.value = '100';
  imgPreview.style.filter = '';
  currentEffect = effectName;
};

var changeImageEffectLevel = function(level) {
  var filter = '';

  switch (currentEffect) {
    case 'chrome' :
      filter = 'grayscale(' + (level / 100) + ')';
      break;
    case 'sepia' :
      filter = 'sepia(' + (level / 100) + ')';
      break;
    case 'marvin' :
      filter = 'invert(' + level + '%)';
      break;
    case 'phobos' :
      filter = 'blur(' + (level * 5 / 100) + 'px)';
      break;
    case 'heat' :
      filter = 'brightness(' + (level * 2 / 100 + 1) + ')';
      break;
  }

  imgPreview.style.filter = filter;
};

var updateScaleValue = function() {
  var pinLeft = scalePin.offsetLeft;
  var scaleWidth = scaleLine.offsetWidth;

  var value = Math.round(pinLeft / scaleWidth * 100);
  scaleValueInput.value = value;

  return value;
};

// Обработчики
// --------------
var onUploadPopupEscPress = function(evt) {
  if (evt.code === 'Escape'
    && evt.target !== uploadHashtags
    && evt.target !== uploadDescription) {
    closeUploadPopup();
  }
};

var onEffectsChange = function(evt) {
  var effectName = evt.target.value;
  applyImageEffect(effectName);
};

var onScalePinMouseUp = function() {
  var effectLevel = updateScaleValue();
  changeImageEffectLevel(effectLevel);
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
// TODO
// bigPicture.classList.remove('hidden');

var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadClose = uploadPopup.querySelector('.img-upload__cancel');
var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadHashtags = uploadForm.querySelector('.text__hashtags');
var uploadDescription = uploadForm.querySelector('.text__description');

uploadFile.addEventListener('change', openUploadPopup);
uploadClose.addEventListener('click', closeUploadPopup);

var imgUpload = document.querySelector('.img-upload');
var imgPreview = imgUpload.querySelector('.img-upload__preview img');
var effects = document.querySelector('.effects');
var effectSelected = document.querySelector('.effects__radio:checked');
var scale = document.querySelector('.scale');
var scaleLine = document.querySelector('.scale__line');
var scalePin = scale.querySelector('.scale__pin');
var scaleValueInput = scale.querySelector('.scale__value');

var currentEffect = '';

effects.addEventListener('change', onEffectsChange);
scalePin.addEventListener('mouseup', onScalePinMouseUp);

applyImageEffect(effectSelected.value);
