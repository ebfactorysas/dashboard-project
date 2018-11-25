// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var scsslint = require('gulp-scss-lint');
var scssLintStylish = require('gulp-scss-lint-stylish');
var imagemin = require('gulp-imagemin');
var insert = require('gulp-insert');
var eslint = require('gulp-eslint');
var argv = require('yargs').argv;
var sass_config = {
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/compass-mixins/lib/'
  ]
};
// var ngTemplateStrings = require('gulp-ng-template-strings');

// Compile Our Sass
gulp.task('sass', function () {
  return gulp.src('sass/global.scss')
    .pipe(sourcemaps.init())
    // Globbing all imported files with the path /**/*.scss from global.scss
    .pipe(sassGlob())
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});


gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', gulp.parallel('sass'))
  .on('change', function(path, stats) {
      console.log('File ' + path + ' was changed');
  })
  .on('unlink', function(path, stats) {
      console.log('File ' + path + ' was removed');
  });
});


// Default Task
gulp.task('default', gulp.series('sass','watch', function (done) {
  // task code here
  done();
}));
