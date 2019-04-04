// Include gulp
const {
  series,
  src,
  dest
} = require('gulp');

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
const hash = require('gulp-hash-filename');
const htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
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
var hashedJS = [];

// Compile Our Sass
function sass() {
  return src('sass/global.scss')
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
    .pipe(dest('css'));
};

function script() {
  return src('./json/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(hash({
      "format": "{name}-{hash}.{ctime}{ext}"
    }))
    .pipe(rename(function (path) {
      console.log(path);
      hashedJS.push(path.dirname +'/'+path.basename + '.js');
      //console.log("hashedJS = " + hashedJS);
    }))
    .pipe(dest('./dist/js'));
}

function html() {
  return src('mockup.html')
    .pipe(htmlreplace({
      // 'css': {
      //   src: hashedCSS,
      //   tpl: '<link rel="stylesheet" href="vendor/public/css/%s">'
      // },
      'js': {
        src: hashedJS,
        tpl: '<script src="/sites/VPS/KIC/SiteAssets/mockUpDev/json/%s"></script>'
      }
    },
  {
    keepBlockTags: true,
  }))
    .pipe(rename('mockup.html'))
    .pipe(dest('./'));
};

//Delete public folder
function deletePublic(){
  return src('dist', {allowEmpty:true})
  .pipe(clean())
}
exports.default = series(deletePublic, script,html);
exports.script = script;
