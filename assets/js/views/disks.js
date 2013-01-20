define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/disks_side.html'),
        HelpTemplate = require('text!templates/disks_help.html'),
        ContentTemplate = require('text!templates/disks_details.html'),
        Disks = require('collections/disks');

    var DisksView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        helpTemplate: Mustache.compile(HelpTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          "click #cav-remove-disk": "removeDisk", 
          "click #cav-claim-disk":  "claimDisk",
          "mouseenter #cav-vol" :   "showDetails", 
          "mouseleave #cav-vol" :   "hideDetails" ,
          "click #cav-vol"      :   "showVolumepage" 
        },

        initialize: function (options) {
            Disks.bind('add',    this._add);
            Disks.on('remove', this.remove,    this);
            Disks.on('reset',  this.reset,     this);
            Disks.on('sort',   this.sort,      this);
            Disks.model.bind('change', this.change,     this);
            Disks.on('change:[attribute]', this.change, this);
            Disks.on('destroy',this.destroy,   this);
            Disks.on('request',this.request,   this);
            Disks.on('sync',   this.sync,      this);
            Disks.on('error',  this.error,     this);
            Disks.on('route:[name]', this.route, this);
            Disks.on('all',    this.all,       this);
        },
        
        fetchCollection: function(self) {
            Disks.fetch({
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
            if (Disks.isEmpty()) {
                this.fetchCollection(this);
            } else {
                this.render();
            }
            //setInterval(function() {
            //    self.fetchCollection(self);
            //}, 2000);
        },
        
        doSync: function(action){
            var fragment = Backbone.history.fragment;
            var route = fragment.split("/");
            var disk = new Disks.model;
            //handle error here if id is undefined redirected to disk page.
            var self = this;
            disk.set({
                'id' : route[1],
                'action' : action
                });
            Backbone.sync('update', disk, {
                url: 'index.php/disks/api',
                success: function(data) {
                    console.log(data.message);
                    self.fetchCollection(self); //it will give updated collection after put
                    Backbone.history.navigate("#disks", true) //it will navigate to disks page.
                },
                error: function(data) {
                    console.log(data.error);
                    self.fetchCollection(self);
                    Backbone.history.navigate("#disks", true)
                }
            });
        },
        
        removeDisk: function() {
            $("#cav-remove-dialog").modal('hide');
            this.doSync('remove');
        },
        
        claimDisk: function() {
            $("#cav-claim-dialog").modal('hide');
            this.doSync('claim');
        },
        
        render: function() {
            this.$('#sidebar').html(this.sidebarTemplate(Disks.toJSON()));
            var fragment = Backbone.history.fragment;
            var route = fragment.split("/");
            //alert(route);
            $('#cav-sidebar-disks-items a[href$="#'+fragment+'"]').parent().addClass('cav-active');
            var id = route[1], object = {}, mainTemplate = null;
            if(id === undefined) {
                mainTemplate = this.helpTemplate;
            } else if(id !== '') {
                mainTemplate = this.contentTemplate;
                object = Disks.get(id).toJSON();
            }
            this.$('#main-content').html(mainTemplate(object));
            mainTemplate = this.contentTemplate;
            return this;
            
        },
        
        refresh: function() {
            this.render();
        },
        
        showDetails : function() {
            this.$("#cav-vol").popover({
                html : true,
                title: function() {
                     return $("#cav-vol-popover-title").html();
                },
                content: function() {
                  return $("#cav-vol-popover-content").html();
                }
            });    
            this.$("#cav-vol").popover('show');        
        },
        
        hideDetails : function() {
            this.$("#cav-vol").popover('hide');   
        },
        
        showVolumepage: function(){
            Backbone.history.navigate("#volumes", true)
        },

        create: function() {
        },

        _add: function(model, collection, options) {
            // when a model is added to a collection.
            console.log('Model Added to collection');
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
