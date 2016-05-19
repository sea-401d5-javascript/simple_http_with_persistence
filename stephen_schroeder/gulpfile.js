const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');


gulp.task('lint', () => {
  return gulp.src(['./.eslintrc', '!node_modules'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src([__dirname + './test/test.js'], { read: false })
  .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  gulp.watch(__dirname + './lib/server.js', ['lint', 'test']);
});

gulp.task('default', ['watch', 'lint', 'test'], () => {
  console.log('Got lucky again eh!');
});
