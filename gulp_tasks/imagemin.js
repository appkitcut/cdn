// PNG画像のファイルサイズ削減

var gulp = require("gulp");
var rename = require("gulp-rename");
var imageMin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");

gulp.task("imagemin", function () {
  gulp.src("src/images/*.png")
    .pipe(imageMin(
      [pngquant({quality: "90"})]
    ))
    .pipe(rename(function (path) {
      // ファイル名.min.cssにリネームする
      path.basename += ".min";
    }))
    .pipe(gulp.dest("src/images"));
});
