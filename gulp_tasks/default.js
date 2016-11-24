var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require("gulp-sourcemaps");

var plumber = require('gulp-plumber');  //Error pass
var notify  = require('gulp-notify');   //Error msg
var browser = require("browser-sync");  //Sync
var changed  = require('gulp-changed'); //Update
var cache      = require('gulp-cached');//Update

var gutil = require('gulp-util');
var stripDebug = require('gulp-strip-debug');//JS del console
var useref = require('gulp-useref');  // html内のcssやjsの読込み部分を変更


// 予備
// var extender = require('gulp-html-extend');
// var sass = require('gulp-compass');
// var uglify = require('gulp-uglify'); //JS comp



// オプション
// ---------------------------------------------------------------
var path = {
    rootapp: "htdocs",
    root: "src"
};

var sassOptions = {
    // outputStyle: 'compressed',
    outputStyle: 'expanded',
    // outputStyle: 'compact',
    // outputStyle: 'nested',
    sourceMap: true,
    sourceComments: false
};

var autoprefixerOptions = {
    browsers: ['last 3 version', 'ie >= 6', 'Android 4.0']
};



// サーバーファンクション
gulp.task("server", function() {
    browser({
        server: {
          baseDir: path.root,
          directory: true
        }
    });
});


// リロードファンクション
gulp.task('bs-reload', function () {
    browser.reload();
});





// Watch
// ---------------------------------------------------------------
gulp.task('watch', function(){
    // gulp.watch(path.root + '**', ['bs-reload']);          // すべてのファイルが更新された時にリロード
    gulp.watch([path.root + '/**/*.html'], ['bs-reload']);   // すべてのHTML更新されるとリロード
    gulp.watch([path.root + '/**/*.js'], ['bs-reload']);   // すべてのJS更新されるとリロード
    gulp.watch( path.root + '/**/*.scss',['sass','bs-reload']);  // すべてのscssが更新された時にリロードしcssを生成
    // gulp.watch(path.root + '/**/*.ejs',['ejs','bs-reload']); // EJSをHTMLに出力

});


// Sass
// ---------------------------------------------------------------
gulp.task('sass', function() {
    gulp.src(path.root + '/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())  // ソースマップ出力処理の初期化
    // .pipe(cache('scss'))  // 更新ファイルのみを対象にする
    .pipe(sass(sassOptions))
    .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write( "./"))  // CSSと同階層にソースマップを出力する
    .pipe(gulp.dest(path.root + '/assets/css/'));
});



// デフォルトタスクの定義
// ---------------------------------------------------------------
gulp.task('default', ['server'], function(){
    gulp.run('watch');
});
