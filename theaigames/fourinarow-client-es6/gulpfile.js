// jshint esversion: 6
const gulp = require('gulp');
const mocha = require('gulp-mocha');

const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rollup = require('gulp-rollup');
const minify = require('gulp-minify');
const clear = require('clear');

// Test
gulp.task('test', () => {
    return gulp.src('dist/**/*-test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});
// Watches ES6 files
gulp.task('watch', () => {
  gulp.watch('src/**/*.es6', ['clear', 'babel', 'test']);
  gulp.watch('test/**/*.es6', ['clear', 'babeltest', 'test']);
});

// clear screen
gulp.task('clear', () => {
  clear();
});

// Compile ES6 -> ES5
gulp.task('babel', () => {
  return gulp.src('src/**/*.es6')
    .pipe(plumber( (err) => {
      console.log(err);
    }))
    .pipe(sourcemaps.init())
    .pipe(rollup({ external: ['request', 'cheerio']}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// compile test ES6 -> ES5
gulp.task('babeltest', () => {
  return gulp.src('test/**/*.es6')
    .pipe(plumber( (err) => { console.log(err); } ))
    .pipe(rollup({ external: ['request', 'cheerio']}))
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('all-test.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('prod', () => {
  return gulp.src('src/**/*.es6')
    .pipe(plumber( (err) => {
      console.log(err);
    }))
    .pipe(sourcemaps.init())
    .pipe(rollup({ external: ['request', 'cheerio']}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(minify({}))
    .pipe(sourcemaps.write('maps', { 
      mapFile: (file) => {
        return file.replace('.js.map', '-min.map');
      }
    }))
    .pipe(gulp.dest('dist'));
});