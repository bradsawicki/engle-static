
/*
npm install gulp gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-clean-css jshint gulp-jshint gulp-concat  gulp-imagemin gulp-newer gulp-changed gulp-rename gulp-file-include browser-sync --save-dev
*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleancss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    changed = require('gulp-changed'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    browser: 'google chrome'
  });
});


gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(newer('dist/images/'))
    .pipe(changed('dist/images/'))
    .pipe(imagemin({ optimazation: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images/'));
});


gulp.task('fileinclude', function() {
  gulp.src('src/pages/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('bs-reload', function() {
  browserSync.reload();
});


gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/**/*.html', ['fileinclude', 'bs-reload']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts', 'bs-reload']);
  gulp.watch('src/images/**/*', ['images', 'bs-reload']);
});
