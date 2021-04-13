'use strict';

// --------------
// Валидация формы загрузки изображения
// --------------
// Зависимости: util

(function() {
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

  var form = document.querySelector('.img-upload__form');
  var hashtagsInput = form.querySelector('.text__hashtags');

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

  var commentInput = form.querySelector('.text__description');

  var validateCommentInput = function() {
    if (commentInput.validity.tooShort) {
      commentInput.setCustomValidity(ERROR_COMMENT_TOO_SHORT);
    } else if (commentInput.validity.tooLong) {
      commentInput.setCustomValidity(ERROR_COMMENT_TOO_LONG);
    } else {
      commentInput.setCustomValidity('');
    }
  };

  commentInput.addEventListener('invalid', function() {
    validateCommentInput();
  });

  var textFieldset = form.querySelector('.img-upload__text');

  textFieldset.addEventListener('invalid', function(evt) {
    evt.target.classList.add('input-error');
  }, true);

  textFieldset.addEventListener('input', function(evt) {
    evt.target.setCustomValidity('');

    if (evt.target.validity.valid) {
      evt.target.classList.remove('input-error');
    }
  });

  textFieldset.addEventListener('keydown', function(evt) {
    window.util.isEscEvent(evt, function() {
      evt.stopPropagation();
    });
  });

  var resetErrors = function() {
    var fieldsWithError = form.querySelectorAll('.input-error');

    for (var i = 0; i < fieldsWithError.length; i++) {
      fieldsWithError[i].setCustomValidity('');
      fieldsWithError[i].classList.remove('input-error');
    }
  };

  var onLoad = function(data) {
    console.log(data);
    window.upload.close();
  };

  var onError = function(error) {
    console.log(error);
  };

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    validateHashtagsInput();

    if (hashtagsInput.validity.valid) {
      window.backend.upload(new FormData(form), onLoad, onError);
    }
  });

  window.uploadForm = {
    reset: function() {
      form.reset();
      resetErrors();
    }
  };
})();
