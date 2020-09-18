const gulp = require('gulp')
const cssMin = require('gulp-clean-css'),
  autoPrefixer = require('gulp-autoprefixer'),
  htmlMin = require('gulp-htmlmin'),
  babel = require('gulp-babel'),
  jsMin = require('gulp-uglify'),
  gulpCssmin = require('gulp-cssmin'),
  gulpConnect = require('gulp-connect')
const { dest } = require('gulp')
const { watch } = require('browser-sync')

function handleCSSFn() {
  return gulp
    .src('./css/*')
    .pipe(
      autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
    )
    .pipe(cssMin())
    .pipe(dest('./output/css'))
    .pipe(gulpConnect.reload())
}

function handleJSFn() {
  return gulp
    .src('./js/*')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(jsMin())
    .pipe(dest('./output/js'))
    .pipe(gulpConnect.reload())
}

function handleHTMLFn() {
  return gulp
    .src('./index.html')
    .pipe(
      htmlMin({
        removeEmptyAttributes: true
      })
    )
    .pipe(dest('./output/html'))
    .pipe(gulpConnect.reload())
}

function handleLocalServer() {
  let serverConfig = {
    livereload: true,
    root: './',
    port: 9999
  }
  return gulpConnect.server(serverConfig)
}

function watchFn() {
  gulp.watch('./css/*', handleCSSFn)
  gulp.watch('./js/*', handleJSFn)
}

exports.all = gulp.series(
  gulp.parallel(handleCSSFn, handleHTMLFn, handleJSFn),
  gulp.parallel(watchFn, handleLocalServer)
)
