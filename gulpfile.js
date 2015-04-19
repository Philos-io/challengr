var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('default', function(){
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'},
    tasks: ['jshint']
  })
  .on('restart', function(){
    console.log('restarted...');
  });
});
