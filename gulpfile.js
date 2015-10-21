var gulp = require('gulp');
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var babelify = require('babelify');

// Without watchify
gulp.task('browserify', function () {
    //return browserify('./script/main.jsx', { debug: true }).transform(babelify, { /* options */ });

    return browserify({ entries: './script/main.jsx', extensions: ['.jsx'], debug: true })
        .transform(babelify)
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('script'));
});

gulp.task('default', ['browserify']);