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
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba'),
    // scripts
    webpack = require('webpack'),
    modernizr = require('gulp-modernizr');

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

  watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts'));

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
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
};

//scripts
gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      "options" : [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});

gulp.task('scripts', scripts);
function scripts() {
  webpack(require('../../webpack.config.js'), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log("\n" + stats.toString() + "\n");

    browserSync.reload();
  });
};
/*
gulp.task('scriptsRefresh', scriptsRefresh);
function scriptsRefresh() {
  browserSync.reload();
};
*/
