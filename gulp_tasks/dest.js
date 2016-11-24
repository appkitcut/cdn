var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var changed  = require('gulp-changed'); // Update
var concat = require("gulp-concat");    // 結合

// 文字コード
// &変換スクリプトが必要
// .pipe(shift({to: "shift_jis"}))
var shift = require('gulp-convert-encoding');


var path = {
    rootapp: "htdocs",
    root: "src"
};



// dist系タスク
// minify系タスク
// ---------------------------------------------------------------
gulp.task('dist', function() {
    gulp.run('disthtml');
    gulp.run('distcss');
    gulp.run('distjs');
    gulp.run('distimg');
    gulp.run('distdata');
});


// HTML
gulp.task('disthtml', function() {
    gulp.src([path.root +'/**/*.html','!/**/_*.html','!/**/_*/**'])
    .pipe(changed(path.root + '/**/*.html'))
    // .pipe(shift({to: "shift_jis"}))
    .pipe(gulp.dest(path.rootapp));
});


// CSS
gulp.task('distcss', function() {
    gulp.src([path.root + '/**/*.css','!/**/_*.css','!/**/_*/**'])
    .pipe(changed( path.root + '/**/*.css' ))
    // .pipe(shift({to: "shift_jis"}))
    .pipe(cssmin())
    .pipe(gulp.dest(path.rootapp));
});


// JS
gulp.task('distjs', function() {
    gulp.src([path.root + '/**/*.js', '!/**/_*.js','!/**/script.js'])
    .pipe(changed(path.root + '/**/*.js'))
    .pipe(concat('script.js'))
    // .pipe(shift({to: "shift_jis"}))
    .pipe(gulp.dest(path.root + '/js/'))
    .pipe(jsmin())
    .pipe(gulp.dest(path.rootapp + '/js/'));
});


// IMG
gulp.task('distimg', function() {
    gulp.src([path.root + '/**/*.{png,jpg,gif,svg}','!/**/_*.{png,jpg,gif,svg}','!/**/_*/**'])
    .pipe(changed( path.root + '/**' ))
    .pipe(gulp.dest(path.rootapp));
});


// DATA
gulp.task('distdata', function() {
    gulp.src([path.root + '/**/*.{xlsx,csv,txt,json}'   ,'!/**/_*/**'])
      .pipe(gulp.dest(path.rootapp));
    gulp.src([path.root + '/**/*.{mp4,ogv,ogg,webm,mp3}','!/**/_*/**'])
      .pipe(gulp.dest(path.rootapp));
    gulp.src([path.root + '/**/*.{woff,eot,otf,woff2}'  ,'!/**/_*/**'])
      .pipe(gulp.dest(path.rootapp));
});



//JS 名前の順に結合される
gulp.task("concat", function () {
  gulp.src(["src/js/*.js", "!src/js/script.js"])
    .pipe(concat("script.js"))
    .pipe(gulp.dest("src/js"));
});




// END
