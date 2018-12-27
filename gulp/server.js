'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const concat = require('gulp-concat');

const ROOT = './';
const DIR_JS = path.join(ROOT,'src/js/');
const DIR_SASS = path.join(ROOT,'src/sass');
const DIR_DIST = path.join(ROOT,'dist/');
const DIR_DIST_JS = path.join(DIR_DIST,'/js');

sass.compiler = require('node-sass');

gulp.task('js', () => {
  gulp.src(path.join(DIR_JS,'**/*.js'))
      .pipe(concat('accordion.js'))
      .pipe(gulp.dest( DIR_DIST_JS ));
});

gulp.task('sass', () => {
  gulp.src( path.join(DIR_SASS, '/*.scss') )
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest( path.join(ROOT, './dist/css')));
});