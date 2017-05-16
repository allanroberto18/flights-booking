var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

var paths = {
    app: './app/js/app.js',
    index: './app/index.html',
    controllers: './app/js/controllers/*.js',
    services: './app/js/services/*.js',
    factories: './app/js/factories/*.js',
    css: './app/css/*',
    templates: './app/js/tpl/*'
};

gulp.task('index', function(done){
    gulp.src(paths.index)
        .pipe(gulp.dest('./www'))
        .on('end', done);
});

gulp.task('app', function(done){
   gulp.src(paths.app)
       .pipe(uglify())
       .pipe(browserify())
       .pipe(gulp.dest('./www/js'))
       .on('end', done);
});

gulp.task('factories', function(done) {
    gulp.src(paths.factories)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('factories.js'))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('services', function(done) {
    gulp.src(paths.services)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('services.js'))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('controllers', function(done){
    gulp.src(paths.controllers)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('templates', function(done) {
    gulp.src(paths.templates)
        .pipe(gulp.dest('./www/js/tpl'))
        .on('end', done);
});

gulp.task('css', function (done) {
    gulp.src(paths.css)
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', ['index', 'app', 'services', 'factories', 'controllers', 'templates', 'css'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default',  ['index', 'app', 'services', 'factories', 'controllers', 'templates', 'css'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });

    gulp.watch(paths.index, ['watch']);
    gulp.watch(paths.app, ['watch']);
    gulp.watch(paths.services, ['watch']);
    gulp.watch(paths.factories, ['watch']);
    gulp.watch(paths.controllers, ['watch']);
    gulp.watch(paths.templates, ['watch']);
    gulp.watch(paths.css, ['watch']);
});
