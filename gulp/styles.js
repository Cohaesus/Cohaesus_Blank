var gulp = require('gulp');
var sass = require('gulp-sass');

// Paths
var paths = {
  src: './src/sass/**/*.scss',
  dest: './build/css',
};

gulp.task('sass', function() {
  compile();
});

function compile(watch) {
  gulp.src(paths.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dest));
}

module.exports = {
  compile: compile,
};
