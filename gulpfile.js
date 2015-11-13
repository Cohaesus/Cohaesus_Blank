var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
var guppy = require('git-guppy')(gulp);

// Default development tasks
gulp.task('default', ['scripts', 'html', 'sass', 'connect']);

// Testing task
gulp.task('test', ['html-lint', 'js-lint', 'scss-lint']);

// Test code on commit
gulp.task('pre-commit', ['test']);
