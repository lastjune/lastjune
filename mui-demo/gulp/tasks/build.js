var gulp = require('gulp');

gulp.task('build', ['browserify', 'css','revCollector','markup']);
