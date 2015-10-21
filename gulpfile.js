var gulp = require('gulp');
var rename = require("gulp-rename");
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');

// Without watchify
gulp.task('browserify', function () {
    return browserify({ entries: './script/main.jsx', extensions: ['.jsx'], debug: true })
        .transform(babelify)
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('script'));
});

gulp.task('stylesheet', function () {
    gulp.src('style/main.less')
        .pipe(less())
        .pipe(rename('build.css'))
        .pipe(gulp.dest('style'));
});

gulp.task('default', ['browserify']);