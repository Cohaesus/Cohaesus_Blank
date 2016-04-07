var gulp = require('gulp');
var config = require('../config/config.json');
var htmllint = require('gulp-htmllint');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var newer = require('gulp-newer');
var gulpCopy = require('gulp-copy');

gulp.task('html', function() {
  gulp.src(config.paths.html.src)
    .pipe(watch(config.paths.html.src))
    .pipe(newer(config.paths.html.dest))
    .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('html-lint', function() {
  return gulp.src(config.paths.html.src)
    .pipe(htmllint({
      config: '../config/.htmllintrc'
    }, htmllintReporter))
});

function htmllintReporter(filepath, issues) {
	
  var filepathSplit = filepath.split('/');
  var fileName = filepathSplit[filepathSplit.length - 1];

  gutil.log(gutil.colors.yellow("Linting '") + gutil.colors.cyan(fileName) + gutil.colors.yellow("'"));

  if (issues.length > 0) {
      issues.forEach(function (issue) {
          gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
      });

      process.exitCode = 1;
  }else{

    gutil.log(gutil.colors.cyan(fileName) + gutil.colors.yellow(" has passed linting!"));
    
  }
}