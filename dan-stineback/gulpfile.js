'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var opts = {
  'extends': 'eslint:recommended',
  'ecmaFeatures': {
    'modules': true
  },
  'rules': {
    'no-alert': 0,
    'no-bitwise': 0,
    'camelcase': 1,
    'no-console': 1,
    'curly': 1,
    'eqeqeq': 0,
    'no-eq-null': 0,
    'guard-for-in': 1,
    'no-empty': 1,
    'no-use-before-define': 0,
    'no-obj-calls': 2,
    'no-unused-vars': 0,
    'new-cap': 1,
    'no-shadow': 0,
    'strict': 1,
    'no-invalid-regexp': 2,
    'comma-dangle': 2,
    'no-undef': 1,
    'no-new': 1,
    'no-extra-semi': 1,
    'no-debugger': 2,
    'no-caller': 1,
    'semi': 1,
    'quotes': 0,
    'no-unreachable': 2
  },
  'globals': {
    '$': false
  },
  'env': {
    'node': true,
    'es6': true
  }
};

gulp.task('default', ['test','lint'], () => {
});

gulp.task('test', () => {
  gulp.src(__dirname + '/test/test.js')
  .pipe(mocha());
});

gulp.task('lint', () => {
  gulp.src(__dirname + '/**.js')
    .pipe(eslint(opts))
    .pipe(eslint.format());
});

gulp.watch(__dirname + '/**/**.js',['test','lint']);
