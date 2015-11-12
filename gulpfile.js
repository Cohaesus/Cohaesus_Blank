var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

function start() {
  tasks.scripts.compile(true);

  //tasks.html.lint();
}

gulp.task('build', function() { return tasks.scripts.compile(); });
gulp.task('start', function() { return start(); });

gulp.task('default', ['start', 'lint', 'connect']);