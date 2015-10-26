var gulp = require('gulp'),
    config = require('../config'),
    buffer = require('gulp-buffer'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

gulp.task('revCollector', function() {
    gulp.src(config.revCollector.entires)
        .pipe(revCollector({replaceReved:true}))
        .pipe(gulp.dest(config.revCollector.dest));
});
