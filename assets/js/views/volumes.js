define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/volumes_side.html'),
        ContentTemplateHelp = require('text!templates/volumes_help.html'),
        ContentTemplateDetails = require('text!templates/volumes_details.html'),
        Volumes = require('collections/volumes'),
        VolJson = {};

    var VolumesView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplateHelp: Mustache.compile(ContentTemplateHelp),
        ContentTemplateDetails: Mustache.compile(ContentTemplateDetails),      
        events: {
          "click #cav-vol-save" : "create",
          "click #cav-vol-del"  : "VolumeDel",
          "click #cav-vol-save" : "VolumeCreate", 
        },

        initialize: function (options) {
            Volumes.on('add',    this.add,       this);
            Volumes.on('remove', this.remove,    this);
            Volumes.on('reset',  this.reset,     this);
            Volumes.on('sort',   this.sort,      this);
            Volumes.on('change', this.change,    this);
            Volumes.on('change:[attribute]', this.change, this);
            Volumes.on('destroy',this.destroy,   this);
            Volumes.on('request',this.request,   this);
            Volumes.on('sync',   this.sync,      this);
            Volumes.on('error',  this.error,     this);
            Volumes.on('route:[name]', this.route, this);
            Volumes.on('all',    this.all,       this);
            Volumes.on('create', this.create,   this);
            
        },

        refresh: function() {
            this.render()
        },

        VolumeCreate: function() {
            var volDel = new Volumes({id: ''});
           /* volObj.create({
                id : '',
                name: 's'
            });
           /* var volObj = new Volumes({
                id : '',
                name: $('#cav-vr-name').val(),
            });
            console.log(volObj);
            this.create(volObj); */
        },

        create: function(attributes, options) {
           
        },

        add: function(model, collection, options) {
            // when a model is added to a collection.

        },

        remove: function(model, collection, options) {
            // when a model is removed from a collection.
           console.log(this.model);

        },

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
            VolJson = {};
            VolJson.volumes = collection.toJSON();
        },

        render: function() {
            var self = this;
            console.log(Backbone.history.fragment);
            var cavRoutes = Backbone.history.fragment.split("/");
            var action = cavRoutes[1], id = cavRoutes[2];

            if(action === undefined || id === undefined) {
                Volumes.fetch({add: true}).complete(function(){
                    self.$('#main-content').html(self.contentTemplateHelp());
                    self.$('#sidebar').html(self.sidebarTemplate(VolJson));
                });
            } else if(action === 'show' && id !== '') {
                Volumes.fetch({add: true}).done(function(){
                    var PageFound = false; 
                    _.find(VolJson.volumes, function(item){
                        if(JSON.stringify(item.id) === id) {
                            VolJson.volume = '';
                            VolJson.volume = item;
                            self.$('#sidebar').html(self.sidebarTemplate(VolJson));
                            self.$('#main-content').html(self.ContentTemplateDetails(VolJson));
                            //  To select side bar menu item..
                            $('#cav-sidebar-vr-items .accordion-inner a[href$="#'+Backbone.history.fragment+'"]').parent().addClass('cav-active');
                            PageFound = true;
                        }
                    });
                    // if page not found !!
                    if(!PageFound) {
                        self.$('#sidebar').html(self.sidebarTemplate(VolJson));
                        self.$('#main-content').html(self.contentTemplateHelp());
                    }
                });
            } else {
                alert(" Page not found !!");
            }
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
            console.log("calling destroy");
            console.log(this.model);
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
        },

        VolumeDel: function() {
            //var volDel = new Volumes({id: 1});
            //this.model.destroy();
            this.remove();
        }

    });

    return VolumesView;
});
