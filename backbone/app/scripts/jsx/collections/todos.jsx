define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/todo'
], function(_, Backbone, Store, Todo) {
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Store('todos-backbone'),

        completed: function() {
            return this.where({
                completed: true
            });
        },

        remaining: function() {
            return this.where({
                completed: false
            });
        },
        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: 'order'
    });

	return new TodosCollection();
});
