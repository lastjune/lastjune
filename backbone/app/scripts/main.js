/*global require*/
'use strict';

require.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.	
    shim: {
        handlebars: {
            //These script dependencies should be loaded before loading
            deps: [ /*jquery,underscore...*/ ],
            //export this module
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars: '../bower_components/handlebars/handlebars',
        react: '../bower_components/react/react',
        JSXTransformer: '../bower_components/react/JSXTransformer',
        output: '../scripts/output'
    }
});

require([
    'backbone', 'react', 'output'
], function(Backbone, React, Output) {
    Backbone.history.start();
    Output();
});
