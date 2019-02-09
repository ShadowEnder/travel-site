var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', function() {
    browserSync.reload();
    html();
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
