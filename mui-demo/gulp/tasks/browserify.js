var gulp=require('gulp')
    ,browseify=require('browserify');

gulp.task('browserify', function() {

    var bundler = browserify( ['./app/scripts/main.js', './app/scripts/login.js']) // Only need initial file, browserify finds the deps
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
                .pipe(gulp.dest('./app/scripts/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() // Create the initial bundle when starting the task
        .on('error',function(err){
            gutil.log(err.message);
            this.emit('end');
        });
        .pipe(source('app.js'))
        .on('error',function(err){
            gutil.log(err.message);
            this.emit('end');
        });
        .pipe(gulp.dest('./app/scripts/'));
});
