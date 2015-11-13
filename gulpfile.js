var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
var guppy = require('git-guppy')(gulp);

function startScripts() {
  tasks.styles.compile(true);
}

gulp.task('build', function() { return tasks.scripts.compile(); });
gulp.task('start', function() { return startScripts(); });

// Default development tasks
gulp.task('default', ['scripts', 'html', 'connect']);

// Testing task
gulp.task('test', ['html-lint', 'js-lint']);

// Test code on commit
gulp.task('pre-commit', ['test']);

// Watch files
// gulp.task('watch', function() {

//   // Watch .js files
//   gulp.watch('src/js/*js', ['build']);

//   // Watch .scss files
//   gulp.watch(['src/sass/**/*scss', 'src/sass/*scss'], function() {
//     return tasks.styles.compile();
//   });
// });

// gulp.task('default', ['start', 'lint', 'connect', 'watch']);
