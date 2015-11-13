var gulp = require('gulp');
var config = require('../config.json');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var scsslint = require('gulp-scss-lint');

gulp.task('sass', function() {
  watch(config.paths.styles.src, function() {
    gulp.start('sass');
  });

  return sass(config.paths.styles.src)
    .pipe(plumber())
    .on('error', sass.logError)
    .pipe(gulp.dest(config.paths.styles.dest));
});

// Linting
gulp.task('scss-lint', function() {
  return gulp.src(config.paths.styles.src)
    .pipe(scsslint({
      'config': 'config/scss-lint.yml',
    }));
});
