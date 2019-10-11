var gulp = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss    = require('gulp-concat-css');
var cleanCSS     = require('gulp-clean-css');
var rename       = require("gulp-rename");
var uglify       = require('gulp-uglify');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "src/"
    });
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "last 1 version",
                "> 1%",
                "maintained node versions",
                "not dead"
            ],
            cascade: false
        }))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('mincss', function() {
    return gulp.src("src/css/*.css")
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest("app/css"));
});

gulp.task('minjs', function() {
    return gulp.src("src/js/*.js")
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("app/js"));
});

gulp.task('min',['mincss', 'minjs']);

gulp.task('default', ['serve', 'watch']);

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
})
