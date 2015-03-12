/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        text: '../bower_components/requirejs-text/text',
		react: '../bower_components/react/react',
		'react-with-addons':'../bower_components/react/react-with-addons'
    }
});

require([
    'backbone',
    'views/app',
    'routers/router',
    'react-with-addons',
    'collections/todos'
], function(Backbone, TodoApp, Workspace,React,Todos) {
    /*jshint nonew:false*/
    // Initialize routing and start Backbone.history()
    new Workspace();
  	var apptodos=Todos;
	React.render(
		React.createElement(TodoApp, {todos: apptodos}),
		document.getElementById('todoapp')
	);
});
