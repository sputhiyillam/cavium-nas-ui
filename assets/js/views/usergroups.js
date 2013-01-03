define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/usergroups_side.html'),
        ContentTemplate = require('text!templates/usergroups_main.html'),
        Usergroups = require('collections/usergroups');

    var UsergroupsView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #create-usergroups": "create"
        },

        initialize: function (options) {
            Usergroups.on('add',    this.add,       this);
            Usergroups.on('remove', this.remove,    this);
            Usergroups.on('reset',  this.reset,     this);
            Usergroups.on('sort',   this.sort,      this);
            Usergroups.on('change', this.change,    this);
            Usergroups.on('change:[attribute]', this.change, this);
            Usergroups.on('destroy',this.destroy,   this);
            Usergroups.on('request',this.request,   this);
            Usergroups.on('sync',   this.sync,      this);
            Usergroups.on('error',  this.error,     this);
            Usergroups.on('route:[name]', this.route, this);
            Usergroups.on('all',    this.all,       this);
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

    return UsergroupsView;
});
