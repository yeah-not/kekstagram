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

  window.uploadForm.reset();
  window.imageSize.reset();
  window.imageEffect.reset();

  document.removeEventListener('keydown', onUploadPopupEscPress);
};

// Старт
// --------------
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadClose = uploadPopup.querySelector('.img-upload__cancel');
var uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', function() {
  openUploadPopup();
});

uploadClose.addEventListener('click', function() {
  closeUploadPopup();
});
