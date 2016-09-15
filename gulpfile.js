// REQUIRE
// ￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣
var gulp = require('gulp');

var plumber = require('gulp-plumber');//Error pass
var notify  = require('gulp-notify');//Error msg
var browser = require("browser-sync");//Sync
var changed  = require('gulp-changed');//Update
var cache      = require('gulp-cached');//Update


var gutil = require('gulp-util');
var stripDebug = require('gulp-strip-debug');//JS del console

// 画像系
var spritesmith = require('gulp.spritesmith');

// CSS,JS
var ejs = require("gulp-ejs");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');

// 文字コード
// var convertEncoding = require('gulp-convert-encoding');



// 予備
// var extender = require('gulp-html-extend');
// var sass = require('gulp-compass');
//JS comp
// var uglify = require('gulp-uglify');


// オプション
// ---------------------------------------------------------------

var path = {
    root: "app/",
    rootdev: "dev/"
};

var sassOptions = {
    // outputStyle: 'compressed',
    outputStyle: 'expanded',
    // outputStyle: 'compact',
    // outputStyle: 'nested',
    sourceMap: true,
    sourceComments: false
};


// ベンダープレフィックス
var autoprefixerOptions = {
    browsers: ['last 3 version', 'ie >= 6', 'Android 4.0']
};




// Sass
// ---------------------------------------------------------------
gulp.task('sass', function() {
    gulp.src(path.rootdev + 'assets/sass/**/*.scss')
    //.pipe(cache('scss'))
    .pipe(sass(sassOptions))
    .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
        }))
    .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(cssmin())
    .pipe(gulp.dest(path.rootdev + 'assets/css/'));
});


// EJS
// devのejsをdevのhtmlに変換
// ---------------------------------------------------------------
gulp.task('ejs', function(){
  gulp.src([ path.rootdev + '**/*.ejs',  '!' + path.rootdev + '**/_*.ejs'])
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(path.root));
});




// dist系タスク
// ---------------------------------------------------------------
gulp.task('dist', function() {
    gulp.src([path.rootdev + '**/*.html','!**/_*/'])
      .pipe(changed(path.root))
      .pipe(gulp.dest(path.root));
    gulp.src([path.rootdev + '**/*.{png,jpg,gif,svg}','!**/_*.{png,jpg,gif,svg}'])
      .pipe(changed(path.root + '/'))
      .pipe(gulp.dest(path.root + '/'));
    gulp.src([path.rootdev + '**/*.js','!**/_*/'])
      .pipe(gulp.dest(path.root + '/'));
    gulp.src([path.rootdev + '**/*.css','!**/_*/'])
      .pipe(gulp.dest(path.root + '/'));

});

gulp.task('distminjs', function() {
    gulp.src([path.rootdev + 'js/**/*.js','!**/_*'])
    .pipe(jsmin())
    //.pipe(changed( path.root + 'js/' ))
    .pipe(gulp.dest(path.root + 'js/'));
});

gulp.task('disth', function() {
    gulp.src([path.rootdev +'**/*.html','!**/_*'])
    .pipe(changed(path.root))
    .pipe(gulp.dest(path.root));
});

gulp.task('distj', function() {
    gulp.src([path.rootdev + '**/*.js', '**/_*.js'])
    .pipe(changed(path.root + '/'))
    .pipe(gulp.dest(path.root + '/'));
});

gulp.task('disti', function() {
    gulp.src([path.rootdev + '/**/*.{png,jpg,gif,svg}'])
    .pipe(changed( path.root + '/' ))
    .pipe(gulp.dest(path.root + '/'));
});

gulp.task('distc', function() {
    gulp.src([path.rootdev + '/**/*.css','**/_*'])
    .pipe(changed( path.root + '/' ))
    .pipe(gulp.dest(path.root + '/'));
});

gulp.task('distdata', function() {
    gulp.src([path.rootdev + '**/*.{xlsx,csv}','!**/_*/'])
      .pipe(changed(path.root))
      .pipe(gulp.dest(path.root));
    gulp.src([path.rootdev + '/**/*.{mp4,ogv,ogg,webm,mp3}','!**/_*/'])
      .pipe(changed(path.root + '/'))
      .pipe(gulp.dest(path.root + '/'));
    gulp.src([path.rootdev + '/**/*.{woff,eot,otf,woff2}','!**/_*/'])
      .pipe(changed(path.root + '/'))
      .pipe(gulp.dest(path.root + '/'));
});




// PHP
// ---------------------------------------------------------------
gulp.task('connect', function() {
  connect.server({
    port:8001,
    base:root
  }, function (){
    browserSync({
      proxy: 'localhost:8001'
    });
  });
});



// Watch
// ---------------------------------------------------------------
gulp.task('watch', function(){
    // すべてのファイルが更新された時にリロード
    gulp.watch(path.rootdev + '**', ['bs-reload']);
    // scssが更新された時にリロード
    gulp.watch(path.rootdev + '/**/*.scss',['sass','bs-reload']);

    // gulp.watch(path.rootdev + '/**/*.html',['copyh']);
    // gulp.watch(path.rootdev + '**/*.ejs',['ejs']);
    // gulp.watch(path.rootdev + '**/*.js',['cjs']);
    // gulp.watch(path.rootdev + 'assets/img/**/*',['cimg']);
    // gulp.watch('htdocs/GTTS_dev/templates/**/*.ejs',['ejs','bs-reload']);
});


// Sprite
// ---------------------------------------------------------------
gulp.task('sprite', function () {
  var spriteData = gulp.src('/htdocs/images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    padding: 10,
    imgPath: '/htdocs/images/sprite/sprite.png',
    cssFormat: 'scss',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteData.img
    .pipe(gulp.dest('/htdocs_pub/images/sprite/'));
    gulp.run('copy-img');

  spriteData.css
    .pipe(gulp.dest('/htdocs/sass/'));
});


// サーバー
// ---------------------------------------------------------------
gulp.task("server", function() {
    browser({
        server: {
          baseDir: path.rootdev
        }
    });
});

// リロード
// ---------------------------------------------------------------
gulp.task('bs-reload', function () {
    browser.reload();
});


// デフォルトタスクの定義
// ---------------------------------------------------------------
gulp.task('default', ['server'], function(){
    gulp.run('watch');
});
