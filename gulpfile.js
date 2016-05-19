const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const watch = require('gulp-watch');

gulp.task('lint', () => {
  gulp.src(['./*.js', './test/*.js'])
        .pipe(eslint({
          env: [
            'mocha',
            'es6'
          ]
        }))
        .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test/*.js', {
    read: false
  })
        .pipe(mocha({
          reporter: 'nyan'
        }));
});

gulp.task('watch', () => {
  gulp.watch(['./*.js', './test/*.js' ], ['mocha', 'lint']);
});

gulp.task('default', ['mocha', 'lint', 'watch']);
