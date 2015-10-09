'use strict';
var gulp = require('gulp'),
    connect = require('connect'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    less = require('gulp-less'),
    rubySass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    size = require('gulp-size'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index');
var babelify = require("babelify");
var gutil=require('gulp-util');

function swallowError(error){
    gutil.log(error.message);
    this.emit('end');
}
/* browserify */
gulp.task('browserify', function() {

    var bundler = browserify( ['./src/scripts/main.js', './src/scripts/login.js']) // Only need initial file, browserify finds the deps
        .transform(reactify)
        .on('error',function(err){
            gutil.log(err.message);
            this.emit('end');
        });
    var watcher = watchify(bundler);
    return watcher
        .on('update', function() { // When any files updates
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle()
                .pipe(source('app.js'))
                // This is where you add uglifying etc.
                .pipe(gulp.dest('./src/scripts/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('app.js'))
        .pipe(gulp.dest('./src/scripts/'));
});

/* styles */
gulp.task('styles', function() {
    return gulp.src('./src/styles/main.less')
        .pipe(plumber())
        .pipe(less({
            style: 'expanded',
            precision: 10
        }))
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(gulp.dest('src/styles'));

});


/* js hint */
gulp.task('jshint', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});


/* connect */
gulp.task('connect', ['styles', 'browserify'], function() {
    var app = connect()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic('src'))
        .use(serveIndex('src'));

    require('http').createServer(app)
        .listen(9005)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9005');
        });
});


/* serve */
gulp.task('serve', ['watch'], function() {
    require('opn')('http://localhost:9005/login.html');
});


/* watch */
gulp.task('watch', ['connect'], function() {

    livereload.listen();

    gulp.watch([
        'src/*.html',
        'src/styles/**/*.css',
        'src/scripts/**/*.js',
        'src/scripts/**/*.jsx',
        'src/images/**/*'
    ]).on('change', livereload.changed);



    gulp.watch('src/styles/**/*.less', ['styles']);
});


/* build */
gulp.task('build', ['styles'], function() {
    gulp.start('browserify');

    /* app */
    gulp.src('src/**/*')
        .pipe(gulp.dest('dist'))
        .pipe(size({
            title: 'build',
            gzip: true
        }));

    /* html */
    var opts = {
        comments: true,
        spare: true,
        quotes: true
    };
    gulp.src('dist/*.html')
        .pipe(minifyHtml(opts))
        .pipe(gulp.dest('dist'));
});

/* default */
gulp.task('default', function() {
    gulp.start('serve');
});
