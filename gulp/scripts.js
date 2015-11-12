// Packages
var os = require('os');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var connect = require('gulp-connect');
var open = require('gulp-open');
var gutil = require('gulp-util');
var config = require('../config.json');

// Compile
function compile(watch) {
  var browserifyOpts = {
    entries: [config.paths.js.src],
    debug: true,
    extensions: ['.jsx']
  }

  var bundler = watchify( browserify(browserifyOpts).transform(babel, {
    presets: ["es2015", "react"]
  }));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.paths.js.dest))
      .pipe(connect.reload());
  }

  if (watch) {
    bundler.on('update', function() {
      gutil.log('Bundling', 'Really it did', gutil.colors.magenta('123'));
      rebundle();
    });
  }

  rebundle();
}

// Connect
gulp.task('connect', function() {
  connect.server({
    port: 8080,
    root: 'build',
    livereload: true
  });

  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080'}));
});

module.exports = {
  compile: compile
}