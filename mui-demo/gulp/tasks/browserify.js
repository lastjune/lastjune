/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/

var browserify = require('browserify'),
    watchify = require('watchify'),
    bundleLogger = require('../util/bundleLogger'),
    gulp = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    source = require('vinyl-source-stream'),
    config = require('../config'),
    buffer = require('gulp-buffer'),
    babelify = require('babelify'),
    rev = require('gulp-rev');

gulp.task('browserify', function(callback) {

    var bundleQueue = config.browserify.bundleConfigs.length;

    var browserifyThis = function(bundleConfig) {

        var bundler = browserify({
            // Required watchify args
            cache: {},
            packageCache: {},
            fullPaths: false,
            // Specify the entry point of your app
            entries: bundleConfig.entries,
            // Add file extentions to make optional in your requires
            extensions: config.browserify.extensions,
            // Enable source maps!
            debug: config.browserify.debug
        });

        var bundle = function() {
            // Log when bundling starts
            bundleLogger.start(bundleConfig.outputName);

            return bundler
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specifiy the
                // desired output filename here.
                .pipe(source(bundleConfig.outputName))
                .pipe(buffer())
                .pipe(rev())
                .pipe(gulp.dest(bundleConfig.dest))
                .pipe(rev.manifest({
                    path: config.rev.revPath,
                    merge: true,
                    base: config.rev.jsonDest
                }))
                .pipe(gulp.dest(config.rev.jsonDest))
                // Specify the output destination
                .on('end', reportFinished);
        };

        bundler.transform(babelify.configure({
            stage: 1
        }));

        if (global.isWatching) {
            // Wrap with watchify and rebundle on changes
            bundler = watchify(bundler);
            // Rebundle on update
            bundler.on('update', bundle);
        }

        var reportFinished = function() {
            // Log when bundling completes
            bundleLogger.end(bundleConfig.outputName);

            if (bundleQueue) {
                bundleQueue--;
                if (bundleQueue === 0) {
                    // If queue is empty, tell gulp the task is complete.
                    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
                    callback();
                }
            }
        };

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    config.browserify.bundleConfigs.forEach(browserifyThis);
});
