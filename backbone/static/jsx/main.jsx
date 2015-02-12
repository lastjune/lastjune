/*global require*/
'use strict';

require.config({
    shim: {
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        handlebars: '../bower_components/handlebars/handlebars',
		react: '../bower_components/react/react',
		JSXTransformer: '../bower_components/react/JSXTransformer'
    }
});

require([
    'backbone','react'
], function (Backbone,React) {
    Backbone.history.start();
	   var MyWidget=React.createClass({
		handleClick:function(){
		alert('Hello!');
		},
		render:function(){
		return (
				<a href="#" onClick={this.handleClick}>Do something!</a>
			);
		}
	});
	var MyView=Backbone.View.extend({
		el:'body',
		template:'<div class="widget-container"></div>',
		render:function(){
			this.$el.html(this.template);
			React.renderComponent(new MyWidget(),this.$('.widget-container').get(0));
			return this;
		}
	});
	MyView().render();
});
