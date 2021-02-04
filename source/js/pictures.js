'use strict';

// --------------
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

// --------------
//  Миниатюры изображений
// --------------

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

// Функции
// --------------
var generatePictures = function(num) {
  var data = [];

  for (var i = 0; i < num; i++) {
    data[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(LIKES_NUM[0], LIKES_NUM[1]),
      comments: generateComments(getRandomInt(COMMENTS_NUM[0], COMMENTS_NUM[1])),
      description: getRandomEl(DESCRIPTIONS),
    };
  }

  return shuffle(data);
};

var generateComments = function(num) {
  var comments = [];

  for (var i = 0; i < num; i++) {
    comments[i] = getRandomInt(0, 1) ? getRandomEl(COMMENTS) : getRandomEl(COMMENTS) + ' ' + getRandomEl(COMMENTS);
  }

  return comments;
};

var renderPicture = function(data) {
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__stat--likes').textContent = data.likes;
  picture.querySelector('.picture__stat--comments').textContent = data.comments.length;

  picture.addEventListener('click', function() {
    openBigPicture(data);
  });

  return picture;
};

// Старт
// --------------
var template = document.querySelector('#main-template').content;
var pictureTemplate = template.querySelector('.picture__link');

var picturesData = generatePictures(PICTURES_NUM);
var picturesContainer = document.querySelector('.pictures');

picturesContainer.appendChild(renderFragment(picturesData, renderPicture));


// --------------
// Просмотр изображения в полноэкранном режиме
// --------------

var AVATARS_NUM = [1, 6];

// Функции
// --------------
var renderBigPicture = function(data) {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  commentsList.appendChild(renderFragment(data.comments, renderComment));
};

var renderComment = function(text) {
  var comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = generateAvatarSrc();
  comment.querySelector('.social__text').textContent = text;

  return comment;
};

var generateAvatarSrc = function() {
  var avatarInt = getRandomInt(AVATARS_NUM[0], AVATARS_NUM[1]);
  var avatarSrc = avatarUrl.replace(AVATARS_NUM[0], avatarInt);

  return avatarSrc;
};

var openBigPicture = function(data) {
  renderBigPicture(data);
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPicture.classList.remove('hidden');
};

var closeBigPicture = function() {
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPicture.classList.add('hidden');
};

var onBigPictureEscPress = function(evt) {
  if (evt.code === 'Escape') {
    closeBigPicture();
  }
};


// Старт
// --------------
// var template = document.querySelector('#main-template').content;
var commentTemplate = template.querySelector('.social__comment');
var avatarUrl = commentTemplate.querySelector('.social__picture').src;

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var commentsList = bigPicture.querySelector('.social__comments');

bigPictureClose.addEventListener('click', function() {
  closeBigPicture();
});
// --------------
// Попап загрузки изображения
// --------------

// Функции
// --------------
var openUploadPopup = function() {
  document.addEventListener('keydown', onUploadPopupEscPress);
  uploadPopup.classList.remove('hidden');
};

var closeUploadPopup = function() {
  uploadPopup.classList.add('hidden');
  uploadForm.reset();
  resetImageSize();
  document.removeEventListener('keydown', onUploadPopupEscPress);
};

var onUploadPopupEscPress = function(evt) {
  if (evt.code === 'Escape') {
    closeUploadPopup();
  }
};

// Старт
// --------------
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadClose = uploadPopup.querySelector('.img-upload__cancel');
var uploadFile = document.querySelector('#upload-file');
// var uploadForm = document.querySelector('.img-upload__form');

uploadFile.addEventListener('change', function() {
  openUploadPopup();
});

uploadClose.addEventListener('click', function() {
  closeUploadPopup();
});

// --------------
// Наложение эффектов на изображение
// --------------

var EFFECT_LEVEL_DEFAULT = 100;

// Функции
// --------------
var applyImageEffect = function(effectName, effectLevel) {
  effectLevel = effectLevel || EFFECT_LEVEL_DEFAULT;

  if (currentEffect) {
    imgPreview.classList.remove('effects__preview--' + currentEffect);
  }

  imgPreview.classList.add('effects__preview--' + effectName);

  if (effectName === 'none') {
    scale.classList.add('hidden');
  } else {
    scale.classList.remove('hidden');
  }

  var filter = '';

  switch (effectName) {
    case 'chrome' :
      filter = 'grayscale(' + (effectLevel / 100) + ')';
      break;
    case 'sepia' :
      filter = 'sepia(' + (effectLevel / 100) + ')';
      break;
    case 'marvin' :
      filter = 'invert(' + effectLevel + '%)';
      break;
    case 'phobos' :
      filter = 'blur(' + (effectLevel * 5 / 100) + 'px)';
      break;
    case 'heat' :
      filter = 'brightness(' + (effectLevel * 2 / 100 + 1) + ')';
      break;
  }

  imgPreview.style.filter = filter;
  currentEffect = effectName;
};

var calcScaleValue = function() {
  var pinLeft = scalePin.offsetLeft;
  var scaleWidth = scaleLine.offsetWidth;

  return Math.round(pinLeft / scaleWidth * 100);
};

var setScaleLevel = function(level) {
  var levelCSS = level + '%';

  scalePin.style.left = levelCSS;
  scaleLevel.style.width = levelCSS;
}

// Старт
// --------------
var imgUpload = document.querySelector('.img-upload');
var imgPreview = imgUpload.querySelector('.img-upload__preview img');
var effectControls = document.querySelector('.effects');
var effectSelected = document.querySelector('.effects__radio:checked');
var scale = document.querySelector('.scale');
var scaleLine = document.querySelector('.scale__line');
var scalePin = scale.querySelector('.scale__pin');
var scaleLevel = scale.querySelector('.scale__level');
var scaleValueInput = scale.querySelector('.scale__value');

var currentEffect = '';

var onEffectControlsChange = function(evt) {
  var effectName = evt.target.value;
  setScaleLevel(EFFECT_LEVEL_DEFAULT);
  scaleValueInput.value = EFFECT_LEVEL_DEFAULT;
  applyImageEffect(effectName);
};

var onScalePinMouseUp = function() {
  // TODO
  setScaleLevel(20);

  var scaleValue = calcScaleValue();
  scaleValueInput.value = scaleValue;
  applyImageEffect(currentEffect, scaleValue);
};

effectControls.addEventListener('change', onEffectControlsChange);
scalePin.addEventListener('mouseup', onScalePinMouseUp);

applyImageEffect(effectSelected.value);


// --------------
// Редактирование размера изображения
// --------------

var SIZE_MIN = 25;
var SIZE_MAX = 100;
var SIZE_STEP = 25;
var SIZE_DEFAULT = 100;

// Функции
// --------------
var resizeImage = function(isDecrease) {
  var size = parseInt(sizeValueInput.value, 10);

  if (isDecrease && size > SIZE_MIN) {
    size -= SIZE_STEP;
  } else if (!isDecrease && size < SIZE_MAX) {
    size += SIZE_STEP;
  }

  sizeValueInput.value = size + '%';
  imgPreview.style.transform = 'scale(' + size / 100 + ')';
};

var resetImageSize = function() {
  sizeValueInput.value = SIZE_DEFAULT;
  imgPreview.style.transform = 'scale(' + SIZE_DEFAULT / 100 + ')';
}

// Старт
// --------------
// var imgUpload = document.querySelector('.img-upload');
// var imgPreview = imgUpload.querySelector('.img-upload__preview img');
var sizeControls = document.querySelector('.img-upload__resize');
var sizeMinus = sizeControls.querySelector('.resize__control--minus');
var sizePlus = sizeControls.querySelector('.resize__control--plus');
var sizeValueInput = sizeControls.querySelector('.resize__control--value');

sizeMinus.addEventListener('click', function() {
  resizeImage(true);
});

sizePlus.addEventListener('click', function() {
  resizeImage(false);
});


// --------------
// Валидация формы загрузки изображения
// --------------

var TAG_MAX_LENGTH = 20;
var TAGS_MAX_NUM = 5;
var TAGS_PATTERN = /[^\w\sА-Яа-яЁё\# -]/;
var COMMENT_MIN_LENGTH = 20;
var COMMENT_MAX_LENGTH = 140;

var ERROR_NO_HASH = 'Хэш-тег должен начинаться с символа # (решётка)';
var ERROR_ONLY_HASH = 'Хэш-тег не может состоять только из одной решётки';
var ERROR_TAG_TOO_LONG = 'Максимальная длина одного хэш-тега ' + TAG_MAX_LENGTH + ' символов, включая решётку';
var ERROR_TAG_NOT_UNIQUE = 'Один и тот же хэш-тег не может быть использован дважды';
var ERROR_TAGS_PATTERN = 'Хэш-теги разделяются пробелами. Используются буквы, цифры, символы "-", "_"';
var ERROR_TAGS_NUM = 'Можно указать не больше ' + TAGS_MAX_NUM + ' хэш-тегов';
var ERROR_COMMENT_TOO_SHORT = 'Минимальная длина комментария ' + COMMENT_MIN_LENGTH + ' cимволов, хотя он и не обязателен;)';
var ERROR_COMMENT_TOO_LONG = 'Максимальная длина комментария ' + COMMENT_MAX_LENGTH + ' cимволов, хотя он и не обязателен;)';

// Функции
// --------------
var validateHashtag = function(hashtag, index, hashtags) {
  var firstChar = hashtag[0];
  var tagCloneIndex = hashtags.indexOf(hashtag, index + 1);
  var errorMsg = '';

  if (firstChar !== '#') {
    errorMsg = ERROR_NO_HASH;
  } else if (firstChar === '#' && hashtag.length === 1) {
    errorMsg = ERROR_ONLY_HASH;
  } else if (hashtag.length > TAG_MAX_LENGTH) {
    errorMsg = ERROR_TAG_TOO_LONG;
  } else if (tagCloneIndex > 0) {
    errorMsg = ERROR_TAG_NOT_UNIQUE;
  } else {
    errorMsg = '';
  }

  return errorMsg;
};

var validateHashtagsInput = function(input) {
  var tagsStr = input.value;
  var tags = tagsStr.trim().toLowerCase().split(' ');
  var errorMsg = '';

  tags = tags.filter(function(el) {
    return el !== '';
  });

  if (tagsStr.match(TAGS_PATTERN)) {
    errorMsg = ERROR_TAGS_PATTERN;
  } else if (tags.length > TAGS_MAX_NUM) {
    errorMsg = ERROR_TAGS_NUM;
  } else {
    for (var i = 0; i < tags.length; i++) {
      errorMsg = validateHashtag(tags[i], i, tags);
      if (errorMsg) {
        break;
      }
    }
  }

  input.setCustomValidity(errorMsg);
  input.reportValidity();
};

// Старт
// --------------
var uploadForm = document.querySelector('.img-upload__form');
var uploadText = uploadForm.querySelector('.img-upload__text');
var hashtagsInput = uploadText.querySelector('.text__hashtags');
var commentInput = uploadText.querySelector('.text__description');

uploadForm.addEventListener('submit', function(evt) {
  validateHashtagsInput(hashtagsInput);

  if (!hashtagsInput.validity.valid) {
    evt.preventDefault();
  }
});

commentInput.addEventListener('invalid', function() {
  if (commentInput.validity.tooShort) {
    commentInput.setCustomValidity(ERROR_COMMENT_TOO_SHORT);
  } else if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity(ERROR_COMMENT_TOO_LONG);
  } else {
    commentInput.setCustomValidity('');
  }
});

uploadText.addEventListener('invalid', function(evt) {
  evt.target.classList.add('input-error');
}, true);

uploadText.addEventListener('input', function(evt) {
  var target = evt.target;

  target.setCustomValidity('');

  if (evt.target.validity.valid) {
    evt.target.classList.remove('input-error');
  }
});

uploadText.addEventListener('keydown', function(evt) {
  if (evt.code === 'Escape') {
    evt.stopPropagation();
  }
});
