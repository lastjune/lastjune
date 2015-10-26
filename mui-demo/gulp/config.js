var dest = './dist',
    src = './src',
    mui = './node_modules/material-ui/src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for sass sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ]
    },
    markup: {
        src: [],
        dest: dest
    },
    watchList: {
        css:src + '/styles/*.less',
        js:[src + '/scripts/*.jsx', src + '/scripts/*.js'],
        html: [src + '/*.html',dest+'/manifest.json']
    },
    static: {
        src: [src + "/styles/vendor/*"],
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: [src + '/scripts/login.js', src + '/scripts/main.js'],
            dest: dest + '/scripts/',
            outputName: 'app.js'
        }]
    },
    rev: {
        entires: ['./dist/scripts/app.js'],
        dest: './dist/scripts/',
        jsonDest: dest,
        revFileName: 'manifest.json',
        revPath: './dist/manifest.json'
    },
    revCollector: {
        entires: [dest + '/manifest.json', src + '/*.html'],
        dest: dest
    },
    css: {
        entires: src + '/styles/**/*.less',
        src: src + '/styles/**/*.css',
        dest: dest + '/styles/'
    },
    server: {
        serverIndexPage: 'login.html'
    }
};
