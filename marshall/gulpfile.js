const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');

gulp.task('default', ['lint', 'test'], () => {
  console.log('Is it running? It is!')
});

gulp.task('lint', function() {
  return gulp.src(['./*.js'])
    .pipe(eslint());
    .pipe(eslint.format());
});

gulp.watch('./*.js', ['lint', 'test']);
