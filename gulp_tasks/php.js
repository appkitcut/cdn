
var gulp = require('gulp');



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
