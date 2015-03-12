define([
	'jquery',
	'underscore',
	'backbone',
	'react-with-addons',
	'models/todo',
	'collections/todos',
	'views/todoItem',
	'views/footer'
],function($,_,Backbone,React,Todo,Todos,TodoItem,TodoFooter){
	'use strict';
	var app=app||{};
		app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';

	var TodoFooter = React.createClass({displayName: "TodoFooter",
		render: function () {
			var activeTodoWord = this.props.count === 1 ? 'item' : 'items';
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					React.createElement("button", {
						id: "clear-completed", 
						onClick: this.props.onClearCompleted}, 
						"Clear completed (", this.props.completedCount, ")"
					)
				);
			}

			// React idiom for shortcutting to `classSet` since it'll be used often
			var cx = React.addons.classSet;
			var nowShowing = this.props.nowShowing;
			return (
				React.createElement("footer", {id: "footer"}, 
					React.createElement("span", {id: "todo-count"}, 
						React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"
					), 
					React.createElement("ul", {id: "filters"}, 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/", 
								className: cx({selected: nowShowing === app.ALL_TODOS})}, 
									"All"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/active", 
								className: cx({selected: nowShowing === app.ACTIVE_TODOS})}, 
									"Active"
							)
						), 
						' ', 
						React.createElement("li", null, 
							React.createElement("a", {
								href: "#/completed", 
								className: cx({selected: nowShowing === app.COMPLETED_TODOS})}, 
									"Completed"
							)
						)
					), 
					clearButton
				)
			);
		}
	});
	return TodoFooter;
});
