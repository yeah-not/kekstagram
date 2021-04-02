'use strict';

// --------------
// Просмотр изображения в полноэкранном режиме
// --------------
// Зависимости: util, data

(function() {
  var AVATARS_NUM = [1, 6];

  var commentTemplate = window.data.template.querySelector('.social__comment');
  var avatarUrl = commentTemplate.querySelector('.social__picture').src;

  var generateAvatarSrc = function() {
    var avatarInt = window.util.getRandomInt(AVATARS_NUM[0], AVATARS_NUM[1]);
    var avatarSrc = avatarUrl.replace(AVATARS_NUM[0], avatarInt);

    return avatarSrc;
  };

  var renderComment = function(text) {
    var comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = generateAvatarSrc();
    comment.querySelector('.social__text').textContent = text;

    return comment;
  };

  var popup = document.querySelector('.big-picture');
  var popupClose = popup.querySelector('.big-picture__cancel');
  var commentsList = popup.querySelector('.social__comments');

  var render = function(data) {
    popup.querySelector('.big-picture__img img').src = data.url;
    popup.querySelector('.likes-count').textContent = data.likes;
    popup.querySelector('.comments-count').textContent = data.comments.length;
    popup.querySelector('.social__caption').textContent = data.description;
    popup.querySelector('.social__comment-count').classList.add('visually-hidden');
    popup.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

    commentsList.appendChild(window.util.renderFragment(data.comments, renderComment));
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
