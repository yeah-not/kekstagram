'use strict';

// --------------
// Просмотр изображения в полноэкранном режиме
// --------------
// Зависимости: util, data

(function() {
  var COMMENTS_PER_PAGE = 5;

  var popup = document.querySelector('.big-picture');
  var popupClose = popup.querySelector('.big-picture__cancel');
  var commentsList = popup.querySelector('.social__comments');
  var commentTemplate = window.data.template.querySelector('.social__comment');

  var renderComment = function(data) {
    var comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = data.avatar;
    comment.querySelector('.social__text').textContent = data.message;
    comment.querySelector('.social__author').textContent = data.name;

    return comment;
  };

  var render = function(data) {
    popup.querySelector('.big-picture__img img').src = data.url;
    popup.querySelector('.likes-count').textContent = data.likes;
    popup.querySelector('.comments-count').textContent = data.comments.length;
    popup.querySelector('.social__comment-count').classList.add('visually-hidden');
    popup.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

    var caption = data.description.trim();
    var captionArr = caption.split(/(#.*)/);
    var description = '';
    var tags = '';

    if (caption[0] === '#') {
      tags = caption;
    } else if (captionArr.length > 1) {
      description = captionArr[0];
      tags = captionArr[1];
    } else {
      description = caption;
    }

    popup.querySelector('.social__description').textContent = description.trim();
    popup.querySelector('.social__tags').textContent = tags.trim();

    var comments = data.comments.slice(0, COMMENTS_PER_PAGE);

    window.util.removeChildren(commentsList);
    commentsList.appendChild(window.util.renderFragment(comments, renderComment));
  };

  var onEscPress = function(evt) {
    window.util.isEscEvent(evt, close);
  };

  var close = function() {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  popupClose.addEventListener('click', function() {
    close();
  });

  window.preview = {
    open: function(data) {
      render(data);
      document.addEventListener('keydown', onEscPress);
      popup.classList.remove('hidden');
    }
  };
})();
