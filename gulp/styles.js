var gulp = require('gulp');
var config = require('../config.json');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  compile();
});

function compile(watch) {
  gulp.src(config.paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.styles.dest));
}

module.exports = {
  compile: compile,
};
