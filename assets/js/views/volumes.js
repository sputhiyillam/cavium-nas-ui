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
        VolumesModel = require('models/volumes'),
        VolObj = [],
        VolJson = {};

    var VolumesView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        contentTemplateHelp: Mustache.compile(ContentTemplateHelp),
        ContentTemplateDetails: Mustache.compile(ContentTemplateDetails),      
        events: {
          "click #create-volumes": "create"
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

            Volumes.on('navigator', this.navigator, this);
            
        },

        refresh: function() {
            Volumes.fetch();
        },

        create: function() {
        },

        add: function(model, collection, options) {

            // when a model is added to a collection.
            VolObj.push(model.toJSON());
        },

        remove: function(model, collection, options) {
            // when a model is removed from a collection.
        },

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
            VolObj = [];
            collection.each(this.add, this);
            VolJson = {};
            VolJson.volumes = VolObj;
        },

        render: function() {
            this.$('#sidebar').html(this.sidebarTemplate(VolJson));
            this.$('#main-content').html(this.contentTemplateHelp());
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
        },

        /*
            Below method navigate user to different operations like delete, edit and display 112
        */
        navigator: function(action, id) {
            /*
                Loading only for only once..not every router routes to 
                same main path.
            */
            var self = this;
            if(action === undefined || id === undefined) {
                Volumes.fetch().complete(function(){
                    self.render();
                });
            } else {
                /*
                    if user directly enters url then sidebar we need to load,for that we check for
                    empty.
                */

                if(jQuery.isEmptyObject(VolJson)){
                    Volumes.fetch().done(function(){
                        self.manageNavigator(action, id);
                    });
                } else {
                    this.manageNavigator(action, id);
                }
            }
        },
        manageNavigator: function(action , id){
            var self = this;
            if(action === 'show') {
                //to display specific volume information
                _.find(VolJson.volumes, function(item){
                    if(JSON.stringify(item.id) === id) {
                        VolJson.volume = '';
                        VolJson.volume = item;
                        self.$('#sidebar').html(self.sidebarTemplate(VolJson));
                        self.$('#main-content').html(self.ContentTemplateDetails(VolJson));
                        /*to select side bar menu item..*/
                        $('#cav-sidebar-vr-items .accordion-inner a[href$="#'+Backbone.history.fragment+'"]').parent().addClass('cav-active');
                    }
                });
                
            }  
            else
            {
                alert("No such action available!!");
            }
        }

    });

    return VolumesView;
});
