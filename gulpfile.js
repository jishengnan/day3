var gulp = require('gulp');
var sass = require('gulp-sass');
var css = require('gulp-clean-css')
var concat = require('gulp-concat');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/scss'))
})
gulp.task('css', function() {
    return gulp.src('./src/scss/*.css')
        .pipe(concat('index.css'))
        .pipe(css())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass', 'css'))
});
gulp.task('default', gulp.series('sass', 'css', 'watch'));