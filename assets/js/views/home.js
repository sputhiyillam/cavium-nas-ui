define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/home/side.html'),
        ContentTemplate = require('text!templates/home/main.html'),
        Home = require('collections/home');

    var HomeView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #create-home": "create"
        },

        initialize: function (options) {
            Home.on('add',    this.add,       this);
            Home.on('remove', this.remove,    this);
            Home.on('reset',  this.reset,     this);
            Home.on('sort',   this.sort,      this);
            Home.on('change', this.change,    this);
            Home.on('change:[attribute]', this.change, this);
            Home.on('destroy',this.destroy,   this);
            Home.on('request',this.request,   this);
            Home.on('sync',   this.sync,      this);
            Home.on('error',  this.error,     this);
            Home.on('route:[name]', this.route, this);
            Home.on('all',    this.all,       this);
        },

        refresh: function() {
            Home.fetch();
        },

        render: function() {
            this.$('#sidebar').html(this.sidebarTemplate());
            this.$('#main-content').html(this.contentTemplate());
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

    return HomeView;
});
