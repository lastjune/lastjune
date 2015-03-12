define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/todo'
],function(_,Backbone,Store,Todo){
	'use strict';

	var TodosCollection=Backbone.Collection.extend({
		model:Todo,
		localStorage:new Store('todo-mvc-local'),
		remaining:function(){
			return this.where({completed:false});
		},
		completed:function(){
			return this.where({completed:true});
		},
		nextOrder:function(){
			return this.length?this.last().get('order')+1:1;
		},
		comparator:'order'
	});
	return new TodosCollection();
});
