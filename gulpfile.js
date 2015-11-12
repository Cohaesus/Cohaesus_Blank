var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
//var inuit = require('inuit-starter-kit');

function start() {
  tasks.scripts.compile(true);
  tasks.styles.compile(true);

  //tasks.html.lint();
}

gulp.task('build', function() { return tasks.scripts.compile(); });

gulp.task('start', function() { return start(); });

// Watch files
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/js/*js', ['build']);
    // Watch .scss files
    gulp.watch(['src/sass/**/*scss','src/sass/*scss'], function() {
      return tasks.styles.compile();
    });
});

gulp.task('default', ['start', 'lint', 'connect', 'watch']);
