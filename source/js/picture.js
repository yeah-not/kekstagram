'use strict';

// --------------
//  Миниатюра изображения
// --------------
// Зависимости: data

(function() {
  var template = window.data.template.querySelector('.picture__link');

  var Picture = function(data) {
    this.id = data.id;
    this.image = data.url;
    this.description = data.description;
    this.likesNum = data.likes;
    this.comments = data.comments;
    this.commentsNum = data.comments.length;
  };

  Picture.prototype = {
    render: function() {
      var picture = template.cloneNode(true);

      picture.querySelector('.picture__img').src = this.image;
      picture.querySelector('.picture__stat--likes').textContent = this.likesNum;
      picture.querySelector('.picture__stat--comments').textContent = this.commentsNum;

      return picture;
    }
  };

  window.Picture = Picture;
})();
