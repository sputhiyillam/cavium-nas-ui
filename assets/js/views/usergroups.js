define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/usergroups_side.html'),
        HelpTemplate = require('text!templates/usergroups_help.html'),
        ContentTemplate = require('text!templates/usergroups_details.html'),
        Usergroups = require('collections/usergroups');

    var UsergroupsView = BaseView.extend({
        sidebarTemplate: Mustache.compile(SidebarTemplate),
        helpTemplate: Mustache.compile(HelpTemplate),
        contentTemplate: Mustache.compile(ContentTemplate),

        events: {
          //"click #create-usergroups": "create"
            "click #cav-ug-add-user" : "resetAddPanel"
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

        load: function() {
            //TODO : refresh stops when user revisits previously visited from another page.
            if (Usergroups.isEmpty()) {
                this.fetchCollection(this);
            } else {
                this.render();
            }
        },

        pollUsergroups: function(){
            var route = Backbone.history.fragment.split('/');
            if(route[0] === 'usergroups') {
                // to poll collections
                var self = this;
                setTimeout(function() {
                    self.fetchCollection(self);
                }, 10000);
            }
        },

        clearAllTimeout: function() {
            //to clear previous setTimeout events.
            var highest_timeout_id = setTimeout(";");
            for(var j=0; j<highest_timeout_id; j++){
                clearTimeout(j);
            }
        },

        fetchCollection: function(self) {
            if(!$(".modal").hasClass('in')) {
            // if any modal window opened then stop from fetch() operation.
                Usergroups.fetch({
                    update: true,
                    success: _.bind(function() {
                        self.render();
                        self.pollUsergroups();
                        // TODO: Show growl notification
                    }, self),
                    error: _.bind(function() {
                        self.pollUsergroups();
                        // TODO: Show growl notification
                    }, self)
                });
            } else {
                console.log("Coming inside else fetchCollection !!");
                // calling pollVolume callback again, if modal window opened.
                self.pollUsergroups();
            }
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            if(route[0] === 'usergroups') {
                if(!$(".modal").hasClass('in')) {
                    // If modal window opened stop updating views
                    this.$('#sidebar').html(this.sidebarTemplate());
                    var fragment = Backbone.history.fragment;
                    var route = fragment.split("/");
                    $('#cav-sidebar-vr-items a[href$="#'+fragment+'"]').parent().addClass('cav-active');
                    var id = route[1], object = {}, mainTemplate = null;
                    if( id === undefined) {
                        mainTemplate = this.helpTemplate;
                    } else if(id !== '') {
                        mainTemplate = this.contentTemplate;
                        object = Volumes.get(id).toJSON();
                    }
                    this.$('#main-content').html(mainTemplate(object));     
                    return this;
                }
            }
        },

        resetAddPanel: function() {
            $("#cav-ug-add-edit-model-label").html("Create User");
            $("#cav-ug-user-save").show();
            $("#cav-ug-user-update").hide();
        },
        clearUpdatePanel: function(){

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
