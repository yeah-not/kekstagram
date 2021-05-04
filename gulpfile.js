'use strict';

const {src, dest, series, parallel, watch} = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

const ghpages = require('gh-pages');
const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const isDev = (process.argv.indexOf('--dev') !== -1);

// Functions
// ---------------
function clean() {
  return del('build');
}

function html() {
  return src('source/*.html')
    .pipe(gulpif(!isDev, htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('source/css/*.css', {sourcemaps: isDev})
    .pipe(gulpif(isDev, dest('build/css')))
    .pipe(plumber())
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({level: 2}))
    .pipe(rename('styles.min.css'))
    .pipe(dest('build/css', {sourcemaps: isDev}))
    .pipe(browserSync.stream());
}

// function scripts() {
//   return src('source/js/**/*.js', {sourcemaps: false})
//     .pipe(gulpif(isDev, dest('build/js')))
//     .pipe(plumber())
//     .pipe(uglify({
//       output: {wrap_iife: true}
//     }))
//     .pipe(concat('script.js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(dest('build/js', {sourcemaps: false}))
//     .pipe(browserSync.stream());
// }

function scripts() {
  return src([
    'source/js/util.js',
    'source/js/data.js',
    'source/js/debounce.js',
    'source/js/message.js',
    'source/js/backend.js',
    'source/js/popup.js',
    'source/js/scale.js',
    'source/js/image-size.js',
    'source/js/image-effect.js',
    'source/js/upload-form.js',
    'source/js/upload.js',
    'source/js/picture.js',
    'source/js/preview.js',
    'source/js/gallery.js',
  ], {sourcemaps: isDev})
    .pipe(gulpif(isDev, dest('build/js')))
    .pipe(plumber())
    .pipe(uglify({
      output: {wrap_iife: true}
    }))
    .pipe(concat('script.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('build/js', {sourcemaps: isDev}))
    .pipe(browserSync.stream());
}

function images() {
  return src([
      'source/img/*.{jpg,png,gif,svg}',
      'source/photos/*.{jpg,png,gif}',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(dest('build'));
}

function fonts() {
  return src('source/fonts/*.{woff,woff2}')
    .pipe(dest('build/fonts'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });

  watch('source/*.html', html);
  watch('source/css/*.css', styles);
  watch('source/js/**/*.js', scripts);
}

function deploy(done) {
  if (!isDev) {
    console.log('Deploying...');
    ghpages.publish('build');
  } else {
    console.log('Not available in dev build');
  }
  done();
}

// Tasks
// ---------------
let build = series(clean, parallel(html, styles, scripts, images, fonts));

exports.build = series(build, deploy);
exports.watch = server;
