var gulp = require('gulp'), // needed by both
    // watch
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    // styles
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins');

// watch
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', function() {
    browserSync.reload();
    // html();
  }); // file on computer you want to watch, what happens when changes occur
  watch('./app/assets/styles/**/*.css', function() {
    styles();
    cssInject();
  });
});

gulp.task('cssInject', cssInject);
function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
};

// styles
gulp.task('styles', styles);
function styles() {
  console.log("Styles task ran.");
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
};