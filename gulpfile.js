var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
var guppy = require('git-guppy')(gulp);

var lintOn = "change"; // "change" or "commit"

function startScripts() {
  tasks.scripts.compile(true);
}

gulp.task('build', function() { return tasks.scripts.compile(); });
gulp.task('start', function() { return startScripts(); });

gulp.task('default', ['start', 'html', 'connect']);
gulp.task('test', ['html-lint']);
gulp.task('pre-commit', ['test']);