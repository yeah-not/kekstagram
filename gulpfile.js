'use strict';

const {src, dest, series, parallel, watch} = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

const ghpages = require('gh-pages');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

const isDev = (process.argv.indexOf('--dev') !== -1);

// Functions
// ---------------
function clean() {
  return del('build');
}

function styles() {
  return src('source/css/*.css', {sourcemaps: isDev})
    .pipe(gulpif(isDev, dest('build/css')))
    .pipe(plumber())
    .pipe(cleanCSS({level: 2}))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('build/css', {sourcemaps: isDev}))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('source/js/**/*.js', {sourcemaps: isDev})
    .pipe(gulpif(isDev, dest('build/js')))
    .pipe(plumber())
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('build/js', {sourcemaps: isDev}))
    .pipe(browserSync.stream());
}

function images() {
  return src([
      'source/img/*.{jpg,png,gif}',
      'source/photos/*.{jpg,png,gif}',
      'source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(dest('build'));
}

function html() {
  return src('source/*.html')
    .pipe(dest('build'))
    .pipe(browserSync.stream());
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
let build = series(clean, parallel(styles, scripts, images, html));

exports.build = series(build, deploy);
exports.watch = server;
