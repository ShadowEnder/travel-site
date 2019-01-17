var gulp = require('gulp'),
    watch = require('gulp-watch');

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
function styles(done) {
  console.log("Imagine Sass or PostCSS tasks running here.");
  if(done) done();
};

gulp.task('watch', function() {
  watch('./app/index.html', function() {
    html();
  }); // file on computer you want to watch, what happens when changes occur
  watch('./app/assets/styles/**/*.css', function() {
    styles();
  });
});
