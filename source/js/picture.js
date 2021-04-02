'use strict';

// --------------
//  Миниатюра изображения
// --------------

(function() {
  var template = window.data.template.querySelector('.picture__link');

  window.picture = {
    render: function(data) {
      var picture = template.cloneNode(true);

      picture.querySelector('.picture__img').src = data.url;
      picture.querySelector('.picture__stat--likes').textContent = data.likes;
      picture.querySelector('.picture__stat--comments').textContent = data.comments.length;

      picture.addEventListener('click', function() {
        window.preview.open(data);
      });

      return picture;
    }
  };
})();
