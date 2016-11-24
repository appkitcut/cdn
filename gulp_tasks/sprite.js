var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

var path = {
    rootapp: "htdocs",
    root: "src"
};


// Sprite
// ---------------------------------------------------------------
gulp.task('sprite', function () {
  var spriteData = gulp.src( path.root + '/images/_sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    padding: 10,
    imgPath: path.root +'/images/sprite/sprite.png',
    cssFormat: 'scss',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));

  spriteData.img
    .pipe(gulp.dest( path.root +'/images/sprite/'));
  spriteData.css
    .pipe(gulp.dest(path.root + '/sass/'));

});
