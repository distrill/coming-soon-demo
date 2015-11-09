var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('default', ['watch']);

gulp.task('build-css', function() {
    return gulp.src('public/source/**/*.scss')
        .pipe(sass( {errLogToConsole: true} ))
        .pipe(concat('stylesheet.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('public/source/**/*.scss', ['build-css']);
});
