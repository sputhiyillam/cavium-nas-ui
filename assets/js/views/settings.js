define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/settings_side.html'),
        ContentTemplate = require('text!templates/settings_main.html'),
        Settings = require('collections/settings');

    var SettingsView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #create-settings": "create"
        },

        initialize: function (options) {
            Settings.on('add',    this.add,       this);
            Settings.on('remove', this.remove,    this);
            Settings.on('reset',  this.reset,     this);
            Settings.on('sort',   this.sort,      this);
            Settings.on('change', this.change,    this);
            Settings.on('change:[attribute]', this.change, this);
            Settings.on('destroy',this.destroy,   this);
            Settings.on('request',this.request,   this);
            Settings.on('sync',   this.sync,      this);
            Settings.on('error',  this.error,     this);
            Settings.on('route:[name]', this.route, this);
            Settings.on('all',    this.all,       this);
        },

        render: function() {
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

    return SettingsView;
});
