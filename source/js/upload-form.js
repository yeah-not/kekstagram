'use strict';

// --------------
// Валидация формы загрузки изображения
// --------------
// Зависимости: util, message, backend

(function() {
  var TAG_MAX_LENGTH = 20;
  var TAGS_MAX_NUM = 5;
  var TAGS_PATTERN = /[^\w\sА-Яа-яЁё\# -]/;
  var COMMENT_MIN_LENGTH = 20;
  var COMMENT_MAX_LENGTH = 140;

  var SUCCESS_UPLOAD = 'Изображение загружено :)';

  var Error = {
    NO_HASH: 'Хэш-тег должен начинаться с символа # (решётка)',
    ONLY_HASH: 'Хэш-тег не может состоять только из одной решётки',
    TAG_TOO_LONG: 'Максимальная длина одного хэш-тега ' + TAG_MAX_LENGTH + ' символов, включая решётку',
    TAG_NOT_UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды',
    TAGS_PATTERN: 'Хэш-теги разделяются пробелами. Используются буквы, цифры, символы "-", "_"',
    TAGS_NUM: 'Можно указать не больше ' + TAGS_MAX_NUM + ' хэш-тегов',
    COMMENT_TOO_SHORT: 'Минимальная длина комментария ' + COMMENT_MIN_LENGTH + ' cимволов, хотя он и не обязателен,)',
    COMMENT_TOO_LONG: 'Максимальная длина комментария ' + COMMENT_MAX_LENGTH + ' cимволов, хотя он и не обязателен,)'
  };

  var form = document.querySelector('.img-upload__form');
  var hashtagsInput = form.querySelector('.text__hashtags');

  var validateHashtag = function(hashtag, index, array) {
    var firstChar = hashtag[0];
    var tagCloneIndex = array.indexOf(hashtag, index + 1);
    var errorMsg = '';

    if (firstChar !== '#') {
      errorMsg = Error.NO_HASH;
    } else if (firstChar === '#' && hashtag.length === 1) {
      errorMsg = Error.ONLY_HASH;
    } else if (hashtag.length > TAG_MAX_LENGTH) {
      errorMsg = Error.TAG_TOO_LONG;
    } else if (tagCloneIndex > 0) {
      errorMsg = Error.TAG_NOT_UNIQUE;
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
      errorMsg = Error.TAGS_PATTERN;
    } else if (tags.length > TAGS_MAX_NUM) {
      errorMsg = Error.TAGS_NUM;
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
    var customValidity = '';

    if (commentInput.validity.tooShort) {
      customValidity = Error.COMMENT_TOO_SHORT;
    } else if (commentInput.validity.tooLong) {
      customValidity = Error.COMMENT_TOO_LONG;
    }

    commentInput.setCustomValidity(customValidity);
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

    Array.from(fieldsWithError).forEach(function(field) {
      field.setCustomValidity('');
      field.classList.remove('input-error');
    });
  };

  var onLoad = function() {
    window.message.show(SUCCESS_UPLOAD, 'success');
    uploadForm.onSend();
  };

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    validateHashtagsInput();

    if (hashtagsInput.validity.valid) {
      window.backend.upload(new FormData(form), onLoad);
    }
  });

  var uploadForm = {
    reset: function() {
      form.reset();
      resetErrors();
    },
    onSend: function() {}
  };

  window.uploadForm = uploadForm;
})();
