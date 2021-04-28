'use strict';

// --------------
// Просмотр изображения в полноэкранном режиме
// --------------
// Зависимости: util, data, popup

(function() {
  var COMMENTS_PER_PAGE = 5;

  var preview = new window.Popup('.big-picture');
  var commentsList = preview.el.querySelector('.social__comments');
  var commentsCount = preview.el.querySelector('.social__comment-count');
  var commentsLoaded = commentsCount.querySelector('.comments-loaded');
  var commentsLoadMore = preview.el.querySelector('.social__comment-loadmore');
  var commentTemplate = window.data.template.querySelector('.social__comment');

  var commentsLast = [];
  var commentsNum = 0;

  var renderComment = function(data) {
    var comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = data.avatar;
    comment.querySelector('.social__text').textContent = data.message;
    comment.querySelector('.social__author').textContent = data.name;

    return comment;
  };

  var renderComments = function(comments) {
    if (comments) {
      commentsLast = comments;
      commentsNum = 0;
      window.util.removeChildren(commentsList);
    }

    var commentsCurrent = commentsLast.splice(0, COMMENTS_PER_PAGE);
    commentsNum += commentsCurrent.length;

    commentsList.appendChild(window.util.renderFragment(commentsCurrent, renderComment));
    commentsLoaded.innerText = commentsNum;

    if (commentsLast.length === 0) {
      window.util.hide(commentsLoadMore, true);
    }
  };

  var render = function(data) {
    preview.el.querySelector('.big-picture__img img').src = data.url;
    preview.el.querySelector('.likes-count').textContent = data.likes;
    preview.el.querySelector('.comments-count').textContent = data.comments.length;

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

    preview.el.querySelector('.social__description').textContent = description.trim();
    preview.el.querySelector('.social__tags').textContent = tags.trim();

    renderComments(data.comments.slice());

    if (data.comments.length < COMMENTS_PER_PAGE) {
      window.util.hide(commentsCount, true);
      window.util.hide(commentsLoadMore, true);
    }
  };

  commentsLoadMore.addEventListener('click', function() {
    renderComments();
  });

  preview.onClose = function() {
    window.util.show(commentsCount, true);
    window.util.show(commentsLoadMore, true);
  };

  // Вариант 1 - доступ только к внешним функциям
  window.preview = {
    show: function(data) {
      render(data);
      preview.open();
    }
  };

  // Вариант 2 - доступ ко всему попапу
  // preview.show = function(data) {
  //   render(data);
  //   this.open();
  // };
  //
  // window.preview = preview;
})();
