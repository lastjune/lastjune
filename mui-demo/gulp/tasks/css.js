//@name: css.js
//@author:Timiz Qi, 2015-10-26
//@description: gulp task for handlering css building and reversion
//@version: 0.1.0
var gulp = require('gulp'),
    config = require('../config.js'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    rev = require('gulp-rev');

gulp.task('css', function() {
    gulp.src(config.css.entires)
        .pipe(plumber())
        .pipe(less({
            style: 'expanded',
            precision: 10
        }))
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        /**
         * output building file to dest folder
         * result.css
         */
        //.pipe(gulp.dest(config.css.dest))
        //add version tag
        .pipe(rev())
        /**
         * output rev file to dest folder
         * result-sjidsis.css
         */
        .pipe(gulp.dest(config.css.dest))
        .pipe(rev.manifest({
            path: config.rev.revPath,
            merge: true,
            base: config.rev.jsonDest
        }))
        .pipe(gulp.dest(config.rev.jsonDest));
});
