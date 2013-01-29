define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/disks/side.html'),
        AccordionTemplate = require('text!templates/disks/accordion.html'),
        HelpTemplate = require('text!templates/disks/help.html'),
        ContentTemplate = require('text!templates/disks/details.html'),
        DialogTemplate = require('text!templates/disks/dialog.html'),
        Disks = require('collections/disks');

    var sidebar, help, content, dialog;

    var SidebarView = BaseView.extend({
        el: '#sidebar',
        items: '#sidebar-disk-items',
        accordionTemplate : Mustache.compile(AccordionTemplate),
        initialize: function() {
            Disks.on('add',    this.add, this);
            Disks.on('change', this.remove, this);
        },

        render: function() {
            this.$el.append(SidebarTemplate);
            return this;
        },

        navigate: function(fragment) {
            $(this.items).find('.cav-active').removeClass('cav-active');
            $(this.items).find('a[href$="/'+fragment+'"]').parent().addClass('cav-active');
        },

        change: function(model, options){
            console.log("Model has changed ,please update model..!!");
        },

        add: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.items).append(accordion);
        },

        remove: function(model) {
            $(this.items).find('a[href$="#disks/'+model.get('id')+'"]').parent().remove();  
        }
        
    });

    var ContentView = BaseView.extend({
        el: '#main-content',
        contentTemplate: Mustache.compile(ContentTemplate),
        events: {

        },

        initialize: function (options) {
            //Volumes.on('add',    this.add, this);
            //Volumes.on('remove', this.remove, this);
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            var Obj = Disks.get(route[1]).toJSON();
            var volume = [], misc = { "show_actions" : false};
            if(!Volumes.isEmpty()){
                Volumes.each(function(item){
                    var id = _.pluck(item.get('disks'), 'id');
                    obj = {}; 
                    obj['id'] = item.get('id');
                    obj['name'] = item.get('name');
                    if(_.contains(id, parseInt(route[1], 10))) {
                        volume.push(obj);
                    }
                });
            }

            if(Obj.actions.claim || Obj.actions.eject){
                misc = { "show_actions" : true};
            }

            volume = { "volumes" : volume};
            
            var context = _.extend(Obj, volume, misc);
            console.log(context);
            this.$el.html(this.contentTemplate( context ));
            return this;
        }
    });

    var HelpView = BaseView.extend({
        el: '#main-content',
        helpTemplate: Mustache.compile(HelpTemplate),
        events: {

        },
        initialize: function (options) {
        },
        render: function() {
            this.$el.html(this.helpTemplate(Disks.toJSON()));
            return this;
        },

    });

    var DisksView = BaseView.extend({
        events: {
            "click a[href='#disk-confirm-dialog']"  : "showConfirm", 
            "click #disk-confirm-claim"             : "claimDisk",
            "click #disk-confirm-eject"             : "ejectDisk"
        },

        initialize: function (options) {
             sidebar = new SidebarView;
             content = new ContentView;
             help = new HelpView;
        },

        load: function() {
            var self = this;
            $(".cav-sidebar").hide();
            if (Disks.isEmpty()) {
                sidebar.render();
                var success = function() {
                    Disks.on('change', self.change, this);
                    //Disks.on('remove', self.remove, this);
                    var fragment = Backbone.history.fragment;
                    var route = fragment.split('/');
                    if (route[1] !== undefined ) {
                        sidebar.navigate(fragment);
                        content.render();
                    }
                    self.poll();
                };
                var error = function() {
                    self.poll();
                };
                this.fetch(success, error);
            } else if($("#sidebar-disk").length === 0) { //if disks collection is already full...
                sidebar.render();
                Disks.on('change', self._change, this);
                Disks.each(function(item){
                    sidebar.add(item);
                });
                var fragment = Backbone.history.fragment;
                var route = fragment.split('/');
                if (route[1] !== undefined ) {
                    sidebar.navigate(fragment);
                    content.render();
                }
                self.poll();
            }
            $("#sidebar-disk").show();
            this.render();
        },

        fetch: function(success, error) {
            Volumes.fetch();
            Disks.fetch({
                update: true,
                success: success,
                error: error
            });
        },

        _change: function(model, options) {
            console.log(model);
            console.log("model changed!!");
        },

        add: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is added to a collection.
        },

        remove: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is removed from a collection.
        },

        render: function() {
            var fragment = Backbone.history.fragment;
            var route = fragment.split('/');

            if( route[1] === undefined || Disks.get(route[1]) === undefined) {
                help.render();
            } else {
                sidebar.navigate(fragment);
                content.render();
            }
            return this;
        },

        poll: function(){
            var self = this;
            setTimeout(function() {
                //self.fetchCollection(self);
                //Issue in calling volumes fetch..
                //Volumes.fetch();
            /*    Disks.fetch({
                        success: function(){
                            self.poll();
                        },
                        error: function(){
                            self.poll();  
                        }
                    }); */
            }, 10000);
        },
        
        showConfirm: function(event) {
            $(".btn").removeClass("disabled");
            console.log($(event.currentTarget).attr('id'));
            if($(event.currentTarget).attr('id') === 'disk-claim'){
                $("#disk-confirm-claim").show();
                $("#disk-confirm-eject").hide();
                $("#disk-confirm-msg").html("Are you sure, you want to claim now ?");
            } else {
                $("#disk-confirm-msg").html("Are you sure, you want to eject now ?");
                $("#disk-confirm-claim").hide();
                $("#disk-confirm-eject").show();
            }
        },

        claimDisk: function(){
            $(".btn").addClass("disabled");
            var route = Backbone.history.fragment.split('/');
            var disk = new Disks.model({
                "id"    : route[1],
                "name"  : Disks.get(route[1]).toJSON().name,
                "action": "disk_claim"
            });
            var self = this;
            disk.save(null,{
                success: function(){
                    //Volumes.fetch();
                    Disks.fetch({
                        success: function(){
                            self.poll();
                        },
                        error: function(){
                            self.poll();  
                        }
                    });
                }
            });
        },

        ejectDisk: function(){
            $(".btn").addClass("disabled");
            var route = Backbone.history.fragment.split('/');
            var disk = new Disks.model({
                "id"    : route[1],
                "name"  : Disks.get(route[1]).toJSON().name,
                "action": "disk_safe_remove"
            });
            var self = this;
            disk.save(null,{
                success: function(){
                    //Volumes.fetch();
                    Disks.fetch({
                        success: function(){
                            self.poll();
                        },
                        error: function(){
                            self.poll();  
                        }
                    });
                }
            });  
        }

    });

    return DisksView;
});
