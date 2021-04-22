'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, message, backend, picture, preview

(function() {
  var ERROR_LOAD = 'Изображения не загружены. ';
  var NEW_AMOUNT = 10;

  var pictures = document.querySelector('.pictures');
  var picturesData = [];

  var render = function(data) {
    window.util.removeChildren(pictures);

    var onPictureClick = function(picture, pictureData) {
      picture.addEventListener('click', function() {
        window.preview.open(pictureData);
      });
    };

    pictures.appendChild(window.util.renderFragment(data, window.picture.render, onPictureClick));
  };

  var filters = document.querySelector('.img-filters');
  var filterBtns = filters.querySelectorAll('.img-filters__button');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  filters.addEventListener('click', function(evt) {
    var activeFilter = evt.target.classList.contains('img-filters__button') ? evt.target : null;

    if (activeFilter) {
      [].forEach.call(filterBtns, function(filterBtn) {
        filterBtn.classList.remove('img-filters__button--active');
      });

      activeFilter.classList.add('img-filters__button--active');
    }
  });

  filterPopular.addEventListener('click', function() {
    render(picturesData);
  });

  filterNew.addEventListener('click', function() {
    var picturesDataRandom = window.util.shuffle(picturesData.slice());
    render(picturesDataRandom.slice(0, NEW_AMOUNT));
  });

  filterDiscussed.addEventListener('click', function() {
    var picturesDataSorted = picturesData
      .slice()
      .sort(function(a, b) {
        return b.comments.length - a.comments.length;
      });

    render(picturesDataSorted);
  });

  var showFilters = function() {
    filters.classList.remove('img-filters--inactive');
  };

  var onLoad = function(data) {
    picturesData = data;

    render(picturesData);
    showFilters();
  };

  var onError = function(error) {
    window.message.show(ERROR_LOAD + error, 'error');
  };

  window.backend.load(onLoad, onError);
})();
