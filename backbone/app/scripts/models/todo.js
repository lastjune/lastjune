define([
	'underscore','backbone'
],function(_,Backbone){
	'use strict';
	var Todo=Backbone.Model.extend({
		defaults:{
			title:'',
			completed:false
		},
		toggle:function(){
			this.save({
				completed: !this.get('completed')
			});
		}
	});
	
	return Todo;
});
