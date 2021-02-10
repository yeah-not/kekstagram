'use strict';

// --------------
// Редактирование размера изображения
// --------------

(function() {
  var SIZE_MIN = 25;
  var SIZE_MAX = 100;
  var SIZE_STEP = 25;
  var SIZE_DEFAULT = SIZE_MAX;

  var image = document.querySelector('.img-upload__preview img');
  var controls = document.querySelector('.img-upload__resize');
  var sizeMinus = controls.querySelector('.resize__control--minus');
  var sizePlus = controls.querySelector('.resize__control--plus');
  var sizeInput = controls.querySelector('.resize__control--value');

  var change = function(isDecrease) {
    var size = parseInt(sizeInput.value, 10);

    if (isDecrease && size > SIZE_MIN) {
      size -= SIZE_STEP;
    } else if (!isDecrease && size < SIZE_MAX) {
      size += SIZE_STEP;
    }

    sizeInput.value = size + '%';
    image.style.transform = 'scale(' + size / 100 + ')';
  };

  sizeMinus.addEventListener('click', function() {
    change(true);
  });

  sizePlus.addEventListener('click', function() {
    change(false);
  });

  window.imageSize = {
    reset: function() {
      sizeInput.value = SIZE_DEFAULT;
      image.style.transform = 'scale(' + SIZE_DEFAULT / 100 + ')';
    }
  };
})();
