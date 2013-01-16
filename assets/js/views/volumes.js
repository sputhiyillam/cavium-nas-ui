define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/volumes_side.html'),
        HelpTemplate = require('text!templates/volumes_help.html'),
        ContentTemplate = require('text!templates/volumes_details.html'),
        Volumes = require('collections/volumes');

    var VolumesView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        helpTemplate: Mustache.compile(HelpTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),      
        events: {
          "click #cav-vol-save" : "create",
          "click #cav-vol-delete"  : "deleteVolume",
        },

        initialize: function (options) {
            Volumes.bind('add',    this._add);
            Volumes.on('remove', this.remove,    this);
            Volumes.on('reset',  this.reset,     this);
            Volumes.on('sort',   this.sort,      this);
            Volumes.model.bind('change', this.change,    this);
            Volumes.on('change:[attribute]', this.change, this);
            Volumes.on('destroy',this.destroy,   this);
            Volumes.on('request',this.request,   this);
            Volumes.on('sync',   this.sync,      this);
            Volumes.on('error',  this.error,     this);
            Volumes.on('route:[name]', this.route, this);
            Volumes.on('all',    this.all,       this);
        },

        fetchCollection: function(self) {
            Volumes.fetch({
                update: true, remove: true,
                success: _.bind(function() {
                    self.render();
                    // TODO: Show growl notification
                }, self),
                error: _.bind(function() {
                    // TODO: Show growl notification
                }, self)
            });
        },

        load: function() {
            var self = this;
            if (Volumes.isEmpty()) {
                this.fetchCollection(this);
            } else {
                this.render();
            }
            //setInterval(function() {
            //    self.fetchCollection(self);
            //}, 2000);
        },

        refresh: function() {
            this.render();
        },

        create: function(attributes, options) {
           
        },

        _add: function(model, collection, options) {
            // when a model is added to a collection.
            console.log('Model Added to collection');
        },

        remove: function(model, collection, options) {
            // when a model is removed from a collection.
            console.log('Model removed from collection');
        },

        deleteVolume: function() {
            console.log('Delete Volume Called');
            var fragment = Backbone.history.fragment;
            var route = fragment.split("/");
            Backbone.sync('delete', Volumes.get(route[2]), {
                url: Volumes.get(route[2]).url,
                success: function() {
                    console.log('Model deleted successfully');
                },
                error: function() {
                    console.log('Model deleted failed');
                }
            });
            // when a model is removed from a collection.
        },

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
            console.log('reset');
        },

        render: function() {
            this.$('#sidebar').html(this.sidebarTemplate(Volumes.toJSON()));
            var fragment = Backbone.history.fragment;
            var route = fragment.split("/");
            $('#cav-sidebar-vr-items a[href$="#'+fragment+'"]').parent().addClass('cav-active');
            var action = route[1], id = route[2], object = {}, mainTemplate = null;
            if(action === undefined || id === undefined) {
                mainTemplate = this.helpTemplate;
            } else if(action === 'show' && id !== '') {
                mainTemplate = this.contentTemplate;
                object = Volumes.get(id).toJSON();
            }
            this.$('#main-content').html(mainTemplate(object));
            // TODO Handle page not found
            return this;
        },

        sort: function (collection, options) {
            // when the collection has been re-sorted.
        },

        change: function(model, options) {
            //when a model's attributes have changed.
            // Notify here. Growl notifications.
            console.log('Model Changed for Volume');
        },

        change_attribute: function(model, value, options) {
            //when a specific attribute has been updated.
        },

        destroy: function(model, collection, options) {
            console.log("calling destroy");
            console.log(this.model);
            //when a model is destroyed.
        },

        request: function(model, xhr, options) {
            //when a model (or collection) has started a request to the server.
            // TODO: Start animating the refresh icon here
        },

        sync: function(model, resp, options) {
            //when a model has been successfully synced with the server.
            // TODO: Stop animating the refresh icon here
        },

        error: function(model, collection) {
            //when a model's validation fails, or a save call fails on the server.
            // TODO: Show an error message
        },

        route_name: function(router) {
            //when one of a router's routes has matched.
        },

        all: function() {
            //this special event fires for any triggered event, passing the event name as the first argument.
        },

    });

    return VolumesView;
});
