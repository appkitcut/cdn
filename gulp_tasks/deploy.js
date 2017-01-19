// FTP
var gulp = require('gulp');
var ftp = require('vinyl-ftp');
var fs = require('fs');

var loadJsonSync = function(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

gulp.task('deploy', function(){
  // FTP設定ファイル読み込み
  var ftpConfig = loadJsonSync(__dirname + '/ftpconfig.json');
  ftpConfig.log = console.log;// ロガーを加える

  // デプロイ先ディレクトリ
  var remoteDest = '/web/tech/';

  // デプロイ対象ファイル & 非対称ファイル設定
  var globs = [
    './src/**',

    '!./**/*.DS_Store',
    '!./gulpfile.js',
    '!./ftpconfig.json',
    '!./package.json',
    '!./gulp/**',
    '!./node_modules/**'
  ];

  var conn = ftp.create(ftpConfig);
  gulp.src(globs, {buffer: false, dot: true})
    .pipe(conn.newerOrDifferentSize(remoteDest))
    .pipe(conn.dest(remoteDest));
});
