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


// --------------
// Попап загрузки изображения
// --------------

// Функции
// --------------
var onUploadPopupEscPress = function(evt) {
  window.util.isEscEvent(evt, closeUploadPopup);
};

var openUploadPopup = function() {
  document.addEventListener('keydown', onUploadPopupEscPress);
  uploadPopup.classList.remove('hidden');
};

var closeUploadPopup = function() {
  uploadPopup.classList.add('hidden');

  uploadForm.reset();
  window.imageSize.reset();
  window.imageEffect.reset();

  document.removeEventListener('keydown', onUploadPopupEscPress);
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
var validateHashtag = function(hashtag, index, array) {
  var firstChar = hashtag[0];
  var tagCloneIndex = array.indexOf(hashtag, index + 1);
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

var validateHashtagsInput = function() {
  var tagsStr = hashtagsInput.value;
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

  hashtagsInput.setCustomValidity(errorMsg);
  hashtagsInput.reportValidity();
};

var validateCommentInput = function() {
  if (commentInput.validity.tooShort) {
    commentInput.setCustomValidity(ERROR_COMMENT_TOO_SHORT);
  } else if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity(ERROR_COMMENT_TOO_LONG);
  } else {
    commentInput.setCustomValidity('');
  }
};

// Старт
// --------------
var uploadForm = document.querySelector('.img-upload__form');
var uploadText = uploadForm.querySelector('.img-upload__text');
var hashtagsInput = uploadText.querySelector('.text__hashtags');
var commentInput = uploadText.querySelector('.text__description');

uploadForm.addEventListener('submit', function(evt) {
  validateHashtagsInput();

  if (!hashtagsInput.validity.valid) {
    evt.preventDefault();
  }
});

commentInput.addEventListener('invalid', function() {
  validateCommentInput();
});

uploadText.addEventListener('invalid', function(evt) {
  evt.target.classList.add('input-error');
}, true);

uploadText.addEventListener('input', function(evt) {
  evt.target.setCustomValidity('');

  if (evt.target.validity.valid) {
    evt.target.classList.remove('input-error');
  }
});

uploadText.addEventListener('keydown', function(evt) {
  window.util.isEscEvent(evt, function() {
    evt.stopPropagation();
  });
});
