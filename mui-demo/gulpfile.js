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
    serveIndex = require('serve-index'),
    clean=require('gulp-clean'),
    rev=require('gulp-rev');
var babelify = require("babelify");
var gutil=require('gulp-util');
var buffer = require('gulp-buffer');
function swallowError(error){
    gutil.log(error.message);
    this.emit('end');
}
/* static files need to move to dist folder*/
var filesToMove = [
        'src/*.ico'
    ];
var vendorCssToMove = [
        'src/styles/vendor/*.css'
    ];
gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove)
  .pipe(gulp.dest('dist/'));
  gulp.src(vendorCssToMove,{basedir:'./'})
  .pipe(gulp.dest('dist/styles/vendor'));
});
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
            .on('error',function(err){
                gutil.log(err.message);
                this.emit('end');
            })
            .pipe(source('app.js'))
            .on('error',function(err){
                console.log(err.message);
            })
            .pipe(gulp.dest('src/scripts/'))
            .pipe(buffer())
            .pipe(rev())
            // This is where you add uglifying etc.
            .pipe(gulp.dest('dist/scripts/'))
            .pipe(livereload())
            .pipe(rev.manifest({
                path:"dist/rev-manifest.json",
                merge:true,
                base:'./dist'
            }))
            .pipe(gulp.dest('./dist'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .on('error',function(err){
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .on('error',function(err){
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest('.src/scripts/'))
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(livereload())
        .pipe(rev.manifest({
            path:"dist/rev-manifest.json",
            merge:true,
            base:'./dist'
        }))
        .pipe(gulp.dest('./dist'));
});

/* styles */
gulp.task('styles', function() {
    console.log('start compile less file...');
    return gulp.src('./src/styles/*.less')
        .pipe(plumber())
        .pipe(less({
            style: 'expanded',
            precision: 10
        }))
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        //.pipe(gulp.dest('src/styles'))
        .pipe(rev())
        .pipe(gulp.dest('dist/styles'))
        .pipe(livereload())
        .pipe(rev.manifest({
            path:"dist/rev-manifest.json",
            merge:'true',
            base:'./dist/'
        }))
        .pipe(gulp.dest('./dist/'));
    console.log('finish compile less file...');
});


/* js hint */
gulp.task('jshint', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});


/* connect */
gulp.task('connect', ['rev','move'], function() {
    var app = connect()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic('dist'))
        .use(serveIndex('dist'));

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
        'dist/rev-manifest.json',
        //'dist/*.html',
        'src/images/**/*'
    ]).on('change',livereload.changed);


    gulp.watch(['dist/rev-manifest.json','src/*html'],['compile-html']);
    gulp.watch('src/styles/**/*.less', ['styles']);
});


/* build */
gulp.task('build', ['styles','move'], function() {
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
    gulp.src('src/*.html')
        .pipe(minifyHtml(opts))
        .pipe(gulp.dest('dist'));
});

/* default */
gulp.task('default', function() {
    gulp.start('serve');
});

var revCollector = require('gulp-rev-collector');

gulp.task('rev',['styles','browserify'],function(){
    return gulp.src(['dist/rev-manifest.json','src/*.html'])
        .pipe( revCollector({
            replaceReved: true
        }))
        .pipe( minifyHtml({
                empty:true,
                spare:true
            }) )
        .pipe( gulp.dest('dist') );
});
gulp.task('compile-html',function(){
    console.log('start compile html');
    return gulp.src(['dist/rev-manifest.json','src/*.html'])
        .pipe( revCollector({ replaceReved: true }))
        .pipe( gulp.dest('dist') )
        .pipe(livereload());
    console.log('finish compile html');
});
gulp.task('clean',function(){
    return gulp.src('dist',{read:false})
            .pipe(clean());
});
