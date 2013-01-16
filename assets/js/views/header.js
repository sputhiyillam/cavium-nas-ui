define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        ContentTemplate = require('text!templates/header.html');

    var HeaderView = Backbone.View.extend({
        el: $('#header'),
        contentTemplate: Mustache.compile(ContentTemplate),

        initialize: function (options) {
        },

        render: function() {
            this.$el.html(this.contentTemplate());
            $(".cav-navbar .nav li").removeClass('active');
            var route = Backbone.history.fragment.split("/");
            $(".cav-navbar .nav li a[href$='#"+route[0]+"']").parent('li').addClass('active');
        },

        create: function() {
        },

        add: function(model, collection, options) {
            // when a model is added to a collection.
        },

        remove: function(model, collection, options) {
            // when a model is removed from a collection.
        },

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
        },

        sort: function (collection, options) {
            // when the collection has been re-sorted.
        },

        change: function(model, options) {
            //when a model's attributes have changed.
        },

        change_attribute: function(model, value, options) {
            //when a specific attribute has been updated.
        },

        destroy: function(model, collection, options) {
            //when a model is destroyed.
        },

        request: function(model, xhr, options) {
            //when a model (or collection) has started a request to the server.
        },

        sync: function(model, resp, options) {
            //when a model has been successfully synced with the server.
        },

        error: function(model, collection) {
            //when a model's validation fails, or a save call fails on the server.
        },

        route_name: function(router) {
            //when one of a router's routes has matched.
        },

        all: function() {
            //this special event fires for any triggered event, passing the event name as the first argument.
        }

    });

    return HeaderView;
});
