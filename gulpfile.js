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
  webserver = require('gulp-webserver'),
  bower = require('main-bower-files'),
  bowerNormalizer = require('gulp-bower-normalize'),
  riot = require('gulp-riot');

gulp.task('less', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});

gulp.task('copy', function() {
    gulp.src(src + '/**/*.html')
        .pipe(gulp.dest(dest));

    gulp.src(src + '/**/*.js')
        .pipe(gulp.dest(dest));
});

gulp.task('riotjs', function() {
    return gulp.src(src + '/**/*.tag')
        .pipe(riot())
        .pipe(gulp.dest(dest))
});


gulp.task('vendor', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest(dest + '/vendor/'))
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      // livereload: true,
      // directoryListing: true,
      // open: true
    }));
});


gulp.task('default', function () {
  runSequence('riotjs', 'vendor', 'less', 'copy', function() {
    console.log('js and css build after copy html');
  });
});

gulp.task('server', ['default', 'webserver', 'watch']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
