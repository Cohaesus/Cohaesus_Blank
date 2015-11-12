var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');

function startScripts() {
  tasks.scripts.compile(true);
}

gulp.task('build', function() { return tasks.scripts.compile(); });
gulp.task('start', function() { return startScripts(); });

gulp.task('default', ['start', 'lint', 'connect']);