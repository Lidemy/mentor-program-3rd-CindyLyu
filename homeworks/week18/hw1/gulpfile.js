const {
  src, dest, series, parallel,
} = require('gulp');
const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
// const concat = require('gulp-concat');
const watch = require('gulp-watch');
const clean = require('gulp-clean');


function css() {
  return src('./index.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min', // 檔名的字尾內容
    }))
    .pipe(dest('build/css'));
}

function js() {
  return src('main.js', { sourcemaps: true }) // sourcemaps 是生成相關資訊並顯示在編譯後的檔案內容最後
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(rename({
      basename: 'test',
      suffix: '.min',
    }))
    // .pipe(concat({ path: 'new.js'})) // 合併多個檔案用
    .pipe(dest('build/js', { sourcemaps: true }));
}

function cleanFiles() {
  return src('build')
    .pipe(clean());
}

function watchFiles() {
  watch('*.sass', css);
  watch('*.js', js);
}

exports.js = js;
exports.css = css;
exports.watchFiles = watchFiles;
exports.cleanFiles = cleanFiles;
exports.default = series(cleanFiles, parallel(js, css), watchFiles); // series 依據順序執行；parallel 同時執行
