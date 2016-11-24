var gulp = require('gulp');
var ejs = require("gulp-ejs");

var path = {
    rootapp: "htdocs",
    root: "dev"
};


// EJS
// devのejsをdevのhtmlに変換
gulp.task('ejs', function(){
  gulp.src([ path.root + '/**/*.ejs'])
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(path.root + '/ht/'));
});
