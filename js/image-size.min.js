'use strict';

// --------------
// Редактирование размера изображения
// --------------
// Зависимости: нет

(function() {
  var Size = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100,
    STEP: 25
  };

  var image = document.querySelector('.img-upload__preview img');
  var controls = document.querySelector('.img-upload__resize');
  var sizeMinus = controls.querySelector('.resize__control--minus');
  var sizePlus = controls.querySelector('.resize__control--plus');
  var sizeInput = controls.querySelector('.resize__control--value');

  var calc = function(isDecrease) {
    var size = parseInt(sizeInput.value, 10);

    if (isDecrease && size > Size.MIN) {
      size -= Size.STEP;
    } else if (!isDecrease && size < Size.MAX) {
      size += Size.STEP;
    }

    return size;
  };

  var apply = function(size) {
    sizeInput.value = size + '%';
    image.style.transform = 'scale(' + size / 100 + ')';
  };

  sizeMinus.addEventListener('click', function() {
    apply(calc(true));
  });

  sizePlus.addEventListener('click', function() {
    apply(calc(false));
  });

  window.imageSize = {
    reset: function() {
      apply(Size.DEFAULT);
    }
  };
})();
