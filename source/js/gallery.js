'use strict';

// --------------
//  Галерея изображений
// --------------
// Зависимости: util, data, message, backend, picture, preview

(function() {
  var ERROR_LOAD = 'Изображения не загружены.';
  var NEW_AMOUNT = 10;

  var pictures = document.querySelector('.pictures');
  var picturesData = [];

  var render = function(data) {
    data = data || picturesData;

    var pictureClickHandler = function(picture, pictureData) {
      picture.addEventListener('click', function() {
        window.preview.open(pictureData);
      });
    };

    window.util.removeChildren(pictures, window.picture.selector);
    pictures.appendChild(window.util.renderFragment(data, window.picture.render, pictureClickHandler));
  };

  var renderNew = function() {
    var picturesDataRandom = window.util.shuffle(picturesData.slice());
    render(picturesDataRandom.slice(0, NEW_AMOUNT));
  };

  var renderDiscussed = function() {
    var picturesDataSorted = picturesData
      .slice()
      .sort(function(a, b) {
        return b.comments.length - a.comments.length;
      });

    render(picturesDataSorted);
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
    picturesData = data;
    render();
    showFilters();
  };

  var onError = function(error) {
    window.message.show(ERROR_LOAD + ' ' + error, 'error');
  };

  window.backend.load(onLoad, onError);
})();
