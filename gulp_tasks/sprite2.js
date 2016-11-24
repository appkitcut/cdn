/**
 * 1-5. スプライトシート作成
 */

 var path = {
     rootapp: "htdocs",
     root: "src"
 };



var gulp = require("gulp");
var spritesmith = require("gulp.spritesmith");

gulp.task("sprite2", function () {
  var spriteData = gulp.src(path.root + "/images/_sprite2/*")
    .pipe(spritesmith({
        imgName: "sprite2.png", // スプライトシート名
        cssName: "_sprite2.scss",  // スプライトシート用のSassの変数
        imgPath: path.root + "/images/sprite/sprite2.png", // CSSからスプライトシートまでのパス
        cssFormat: "scss",  // Sass(SCSS)で変数を出力
        cssVarMap: function (sprite) {
          // sprite-(個別パーツ名)で変数を使うための設定
          sprite.name = "sprite-" + sprite.name;
        }
      })
    );

  // スプライトシート書き出し
  spriteData.img.pipe(gulp.dest(path.root + "/images/sprite"));
  // スプライトシート用変数の書き出し
  spriteData.css.pipe(gulp.dest(path.root + "/sass"));
});

// Sassのコンパイルタスクです
var sass = require("gulp-sass");



gulp.task("sass2", function () {
  return gulp.src("src/css/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css/"));
});
