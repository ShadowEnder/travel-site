var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'); // close text editor before running tasks with del

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', beginClean); // close text editor before running
function beginClean() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
};

gulp.task('createSprite', createSprite);
function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
};

gulp.task('copySpriteGraphic', copySpriteGraphic);
function copySpriteGraphic() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
};

gulp.task('copySpriteCSS', copySpriteCSS);
function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
};

gulp.task('endClean', endClean); // close text editor before running
function endClean() {
  return del('./app/temp/sprite');
};

gulp.task('icons', gulp.series('beginClean', 'createSprite', gulp.parallel('copySpriteGraphic', 'copySpriteCSS'), 'endClean')); // close text editor before running
