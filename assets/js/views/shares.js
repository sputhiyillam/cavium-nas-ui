define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/shares_side.html'),
        ContentTemplate = require('text!templates/shares_main.html'),
        Shares = require('collections/shares');

    var SharesView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #create-share": "createShare",
          "click #create-iscsi": "createIscsi"
        },

        initialize: function (options) {
            Shares.on('add',    this.add,       this);
            Shares.on('remove', this.remove,    this);
            Shares.on('reset',  this.reset,     this);
            Shares.on('sort',   this.sort,      this);
            Shares.on('change', this.change,    this);
            Shares.on('change:[attribute]', this.change, this);
            Shares.on('destroy',this.destroy,   this);
            Shares.on('request',this.request,   this);
            Shares.on('sync',   this.sync,      this);
            Shares.on('error',  this.error,     this);
            Shares.on('route:[name]', this.route, this);
            Shares.on('all',    this.all,       this);
            Shares.fetch();
        },

        render: function() {
        },

        createShare: function() {
        },

        createIscsi: function() {
        },

        add: function(model, collection, options) {
            // when a model is added to a collection.
        },

        remove: function(model, collection, options) {
            // when a model is removed from a collection.
        },

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
            collection.each(this.add);
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

    return SharesView;
});
