'use strict';

// --------------
// Данные
// --------------
// Зависимости: util

(function() {
  var PICTURES_NUM = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 20;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];

  var generateComments = function(num) {
    var comments = [];

    for (var i = 0; i < num; i++) {
      comments[i] = window.util.getRandomInt(0, 1) ? window.util.getRandomEl(COMMENTS) : window.util.getRandomEl(COMMENTS) + ' ' + window.util.getRandomEl(COMMENTS);
    }

    return comments;
  };

  window.data = {
    template: document.querySelector('#main-template').content,
    generatePictures: function(num) {
      num = num < PICTURES_NUM ? num : PICTURES_NUM;

      var pictures = [];

      for (var i = 0; i < num; i++) {
        pictures[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.util.getRandomInt(LIKES_MIN, LIKES_MAX),
          comments: generateComments(window.util.getRandomInt(COMMENTS_MIN, COMMENTS_MAX)),
          description: window.util.getRandomEl(DESCRIPTIONS),
        };
      }

      return window.util.shuffle(pictures);
    }
  };
})();
