var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

gulp.task('default', function(done) {
  console.log("Hooray - you created a Gulp task.");
  done();
}); // name of task, what happens when task runs

gulp.task('html', html);
function html(done) {
  console.log("Imagine something useful being done to your HTML here.");
  if(done) done();
};

gulp.task('styles', styles);
function styles() {
  console.log("Styles task ran.");
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
};

gulp.task('watch', function() {
  watch('./app/index.html', function() {
    html();
  }); // file on computer you want to watch, what happens when changes occur
  watch('./app/assets/styles/**/*.css', function() {
    styles();
  });
});
