var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  dest = './dist',
  src = './src',
  config = {
    src: src + '/less/main.less',
    watch: [
      src + '/less/**'
    ],
    dest: dest
  },
  runSequence = require('run-sequence'),
  webserver = require('gulp-webserver');

gulp.task('less', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});

gulp.task('copy', function() {
    gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'));

    gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  runSequence('less', 'copy', function() {
    console.log('js and css build after copy html');
  });
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      // livereload: true,
      // directoryListing: true,
      // open: true
    }));
});

gulp.task('server', [ 'default', 'webserver', 'watch']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
