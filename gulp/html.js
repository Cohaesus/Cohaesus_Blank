var gulp = require('gulp');
var htmllint = require('gulp-htmllint');
var gutil = require('gulp-util');

// Paths
var paths = {
  	src: "./src/*.html",
	dest: "./build"
}

gulp.task('lint', function() {
    return gulp.src(paths.src)
        .pipe(htmllint({}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });
 
        process.exitCode = 1;
    }
}