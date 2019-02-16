var gulp = require('gulp');
var sass = require('gulp-sass');
var css = require('gulp-clean-css');
var server = require('gulp-webserver');
var concat = require('gulp-concat');
var list = require('./data/data.json')
var url = require('url');
var fs = require('fs');
var path = require('path');
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

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathName = url.parse(req.url).pathname;
                if (pathName == '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathName == '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                    return;
                }
                if (pathName == '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: list }));
                    return;
                }
                var uti = path.extname(pathName);
                if (uti) {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathName)));
                    return;
                }
            }
        }))
})



gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass', 'css'))
});
gulp.task('default', gulp.series('sass', 'css', 'server', 'watch'));