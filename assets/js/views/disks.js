define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/disks_side.html'),
        ContentTemplate = require('text!templates/disks_main.html'),
        Disks = require('collections/disks');

    var DisksView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #create-disks": "create"
        },

        initialize: function (options) {
            Disks.on('add',    this.add,       this);
            Disks.on('remove', this.remove,    this);
            Disks.on('reset',  this.reset,     this);
            Disks.on('sort',   this.sort,      this);
            Disks.on('change', this.change,    this);
            Disks.on('change:[attribute]', this.change, this);
            Disks.on('destroy',this.destroy,   this);
            Disks.on('request',this.request,   this);
            Disks.on('sync',   this.sync,      this);
            Disks.on('error',  this.error,     this);
            Disks.on('route:[name]', this.route, this);
            Disks.on('all',    this.all,       this);
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

    return DisksView;
});
