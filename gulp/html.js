var gulp = require('gulp');
var htmllint = require('gulp-htmllint');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var del = require('del');

// Paths
var paths = {
  src: "./src/*.html",
	dest: "./build"
}

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(watch(paths.src))
		.pipe(plumber())
    .pipe(htmllint({}, htmllintReporter))
});

function copy(file){
  gulp.src(file, {root: '/'})
  .pipe(gulp.dest(paths.dest));
}

function htmllintReporter(filepath, issues) {
	
  var filepathSplit = filepath.split('/');
  var fileName = filepathSplit[filepathSplit.length - 1];

  del(paths.dest + '/' + fileName);

  gutil.log(gutil.colors.yellow("Linting '") + gutil.colors.cyan(fileName) + gutil.colors.yellow("'"));

  if (issues.length > 0) {
      issues.forEach(function (issue) {
          gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
      });

      process.exitCode = 1;
  }else{

    gutil.log(gutil.colors.cyan(fileName) + gutil.colors.yellow(" has passed linting!"));
    
    copy(filepath);
    
  }
}