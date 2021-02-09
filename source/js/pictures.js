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
  resetImageSize();
  resetImageEffect();

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
// Редактирование размера изображения
// --------------

var SIZE_MIN = 25;
var SIZE_MAX = 100;
var SIZE_STEP = 25;
var SIZE_DEFAULT = 100;

// Функции
// --------------
var resetImageSize = function() {
  sizeValueInput.value = SIZE_DEFAULT;
  imgPreview.style.transform = 'scale(' + SIZE_DEFAULT / 100 + ')';
};

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

// --------------
// Шкала диапазона
// --------------
var SCALE_MIN = 0;
var SCALE_MAX = 100;

var scale = document.querySelector('.scale');
var scaleLine = scale.querySelector('.scale__line');
var scalePin = scale.querySelector('.scale__pin');
var scaleLevelElem = scale.querySelector('.scale__level');
var scaleValueInput = scale.querySelector('.scale__value');

var hideScale = function() {
  scale.classList.add('hidden');
};

var showScale = function() {
  scale.classList.remove('hidden');
};

var calcScaleLevel = function(shift) {
  var pinLeft = scalePin.offsetLeft + shift;
  var level = pinLeft / scaleLine.offsetWidth * 100;

  return level;
};

var setScaleLevel = function(level) {
  var levelCSS = level + '%';

  scalePin.style.left = levelCSS;
  scaleLevelElem.style.width = levelCSS;
};

var setScaleValue = function(level) {
  var value = Math.round(level);

  scaleValueInput.value = value;

  return value;
};

var resetScale = function() {
  setScaleValue(SCALE_MAX);
  setScaleLevel(SCALE_MAX);
};

scalePin.addEventListener('mousedown', function(evt) {
  var startX = evt.clientX;

  var onMouseMove = function(moveEvt) {
    var shift = moveEvt.clientX - startX;
    startX = moveEvt.clientX;

    var scaleLevel = calcScaleLevel(shift);

    if (scaleLevel >= SCALE_MIN && scaleLevel <= SCALE_MAX) {
      setScaleLevel(scaleLevel);
      applyImageEffect(currentEffect, setScaleValue(scaleLevel));
    }

  };

  var onMouseUp = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseMove);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// --------------
// Выбор и наложение эффекта на изображение
// --------------
var EFFECT_DEFAULT = 'heat';
var EFFECT_LEVEL_DEFAULT = 100;

var imgUpload = document.querySelector('.img-upload');
var imgPreview = imgUpload.querySelector('.img-upload__preview img');
var effectSelected = document.querySelector('.effects__radio:checked');
var currentEffect = '';

var applyImageEffect = function(effectName, effectLevel) {
  if (typeof effectLevel === 'undefined') {
    effectLevel = EFFECT_LEVEL_DEFAULT;
  }

  if (currentEffect) {
    imgPreview.classList.remove('effects__preview--' + currentEffect);
  }

  imgPreview.classList.add('effects__preview--' + effectName);

  if (effectName === 'none') {
    hideScale();
  } else {
    showScale();
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

applyImageEffect(effectSelected.value);

var effectControls = document.querySelector('.effects');

effectControls.addEventListener('change', function(evt) {
  applyImageEffect(evt.target.value);
  resetScale();
});

// Общий сброс
// --------------
var resetImageEffect = function() {
  resetScale();
  applyImageEffect(EFFECT_DEFAULT);
};
