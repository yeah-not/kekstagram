'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, message, backend, picture, preview

(function() {
  var ERROR_LOAD = 'Изображения не загружены.';
  var NEW_AMOUNT = 10;

  var picturesEl = document.querySelector('.pictures');
  var pictureSelector = '.picture__link';
  var picturesAll = [];

  var render = function(pictures) {
    pictures = pictures || picturesAll;

    window.util.removeChildren(picturesEl, pictureSelector);

    var pictureClickHandler = function(pictureEl, picture) {
      pictureEl.addEventListener('click', function() {
        window.preview.show(picture);
      });
    };

    picturesEl.appendChild(window.util.renderObjects(pictures, pictureClickHandler));
  };

  var renderNew = function() {
    var picturesRandom = window.util.shuffle(picturesAll.slice());
    render(picturesRandom.slice(0, NEW_AMOUNT));
  };

  var renderDiscussed = function() {
    var picturesSorted = picturesAll
      .slice()
      .sort(function(a, b) {
        return b.comments.length - a.comments.length;
      });

    render(picturesSorted);
  };

  var filters = document.querySelector('.img-filters');
  var filterBtns = filters.querySelectorAll('.img-filters__button');

  var filterToAction = {
    'filter-popular': render,
    'filter-new': renderNew,
    'filter-discussed': renderDiscussed
  };

  var toggleFilter = function(filter) {
    [].forEach.call(filterBtns, function(filterBtn) {
      filterBtn.classList.remove('img-filters__button--active');
    });

    filter.classList.add('img-filters__button--active');
  };

  filters.addEventListener('click', function(evt) {
    var activeFilter = evt.target.classList.contains('img-filters__button') ? evt.target : null;

    if (activeFilter) {
      toggleFilter(activeFilter);
      window.debounce(filterToAction[activeFilter.id]);
    }
  });

  var showFilters = function() {
    filters.classList.remove('img-filters--inactive');
  };

  var onLoad = function(data) {
    picturesAll = data.map(function(it) {
      return new window.Picture(it);
    });
    render();
    showFilters();
  };

  var onError = function(error) {
    window.message.show(ERROR_LOAD + ' ' + error, 'error');
  };

  window.backend.load(onLoad, onError);
})();
