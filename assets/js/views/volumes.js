define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/volumes/side.html'),
        AccordionTemplate = require('text!templates/volumes/accordion.html'),
        HelpTemplate = require('text!templates/volumes/help.html'),
        ContentTemplate = require('text!templates/volumes/details.html'),
        DialogTemplate = require('text!templates/volumes/dialog.html'),
        Disks = require('collections/disks');
        Volumes = require('collections/volumes');

    var sidebar, help, content, dialog;
    var SidebarView = BaseView.extend({
        el: '#sidebar',
        items: '#cav-sidebar-vr-items',
        accordionTemplate : Mustache.compile(AccordionTemplate),
        initialize: function() {
            Volumes.on('add',    this.add, this);
            Volumes.on('remove', this.remove, this);
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            if (route[0] === 'volumes'){
                this.$el.append(SidebarTemplate);
            }
            return this;
        },

        navigate: function(fragment) {
            $(this.items).find('.cav-active').removeClass('cav-active');
            $(this.items).find('a[href$="/'+fragment+'"]').parent().addClass('cav-active');
        },

        add: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.items).append(accordion);
        },

        remove: function(model) {
            $(this.items).find('a[href$="/volumes/'+model.get('id')+'"]').parent().remove();  
        }
    });

    var ContentView = BaseView.extend({
        el: '#main-content',
        contentTemplate: Mustache.compile(ContentTemplate),
        events: {

        },

        initialize: function (options) {
            Volumes.on('add',    this.add, this);
            Volumes.on('remove', this.remove, this);
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            if (route[0] === 'volumes'){
                var volume = Volumes.get(route[1]).toJSON();
                this.$el.html(this.contentTemplate(volume));
            }
            return this;
        },

        add: function() {
        },

        remove: function(model) {
            var route = Backbone.history.fragment.split('/');
            if(parseInt(model.get('id'), 10) === parseInt(route[1],10)){
                help.render();
            }
        },
    });


    var HelpView = BaseView.extend({
        el: '#main-content',
        helpTemplate: Mustache.compile(HelpTemplate),
        events: {

        },
        initialize: function (options) {
        },
        render: function() {
            var route = Backbone.history.fragment.split('/');
            if (route[0] === 'volumes'){
                this.$el.html(this.helpTemplate(Volumes.toJSON()));
            }
            return this;
        },

    });

    var DialogView = BaseView.extend({
        el: '#cav-vr-add-edit-modal',
        dialogTemplate: Mustache.compile(DialogTemplate),
        events: {
        },

        initialize: function (options) {
        },

        show: function(event) {
            var route = Backbone.history.fragment.split('/');
            var volume = {} , disks = {}, target_raid = '', misc = {};
            var raid = { "raid": [
                { "value": "SPAN",   "text": "SPAN"   },
                { "value": "RAID0",  "text": "RAID 0"  },
                { "value": "RAID1",  "text": "RAID 1"  },
                { "value": "RAID5",  "text": "RAID 5"  },
                { "value": "RAID10", "text": "RAID 10" }
            ]};

            this.clear();
            var target = $(event.currentTarget).attr("id");
            if (target == 'vr-add-vol') {
                disks = { "disks": Disks.toJSON() };
            } else if(target == 'vr-edit-vol') {
                volume = Volumes.get(route[1]).toJSON();
                target_raid = volume.raid;
                misc = {"viewEdit":true, "disabled" : true};
            } else if(target == 'vr-migrate-vol') {
                volume = Volumes.get(route[1]).toJSON();
                target_raid = volume.raid;
                disks = { "disks" : volume.actions.migrate.disks };
                misc = {"viewMigrate":true, "disabled" : true};
            } else if(target == 'vr-extend-vol') {
                volume = Volumes.get(route[1]).toJSON();
                target_raid = volume.raid;
                disks = { "disks" : volume.actions.extend.disks };
                misc = {"viewExtend":true, "disabled" : true};
            } else {
                //To Recovery..
                volume = Volumes.get(route[1]).toJSON();
                target_raid = volume.raid;
                disks = { "disks" : volume.actions.recovery.disks };
                misc = {"viewRecovery":true, "disabled" : true};
            }
            var context = _.extend(volume, disks, raid, misc);
            var htmlText = this.dialogTemplate(context);
            $(this.$el.selector).html(htmlText);
            target_raid !== '' ? $('#cav-vr-raid').val(target_raid) : $('#cav-vr-raid').val('SPAN');
            //TODO : To edit an volume, raid selection is based on number of disks.
            return this;
        },

        clear: function() {
            $('button').removeClass('disabled');
            $('#cav-vr-name, #cav-vr-desc, #cav-vr-size').val('');
            $('#cav-vr-encr, #cav-vr-raw, input[name = "disks"]').prop("checked", false);
            $('#cav-vr-raid').val('SPAN');
            Disks.each(function(disk){
                disk.set({checked : ''});
            })
        }
    });

    var VolumesView = BaseView.extend({
        events: {
            "click #cav-vol-save"                       : "_create",
            "click #cav-vol-update"                     : "_edit",
            "click #cav-vol-delete"                     : "_delete",
            "click #cav-vol-migrate"                    : "_migrate",
            "click #cav-vol-extend"                     : "_extend",
            "click #cav-vol-recovery"                   : "_recovery",
            "click a[href='#cav-vr-add-edit-modal']"    : "showDialog",
            "mouseover .cav-popover"                    : "showPopover",
            "mouseout .cav-popover"                     : "hidePopover",
        },

        initialize: function (options) {
             sidebar = new SidebarView;
             content = new ContentView;
             help = new HelpView;
             dialog = new DialogView;
        },

        load: function() {
            var self = this;
            $(".cav-sidebar").hide();
            if (Volumes.isEmpty()) {
                if($("#cav-sidebar-vr-items").length === 0){
                    sidebar.render();
                }
                var success = function() {
                    Volumes.on('add', self.add, this);
                    Volumes.on('remove', self.remove, this);
                    var fragment = Backbone.history.fragment;
                    var route = fragment.split('/');
                    if (route[1] !== undefined ) {
                        sidebar.navigate(fragment);
                        content.render();
                    }
                    self.load();
                };
                var error = function() {
                    alert("Failed to retrive get data..!!");
                };
                this.fetch(success, error);
            } else if($("#sidebar-volume").length === 0) {
                if($("#cav-sidebar-vr-items").length === 0){
                    sidebar.render();
                }
                Volumes.on('add', self.add, this);
                Volumes.on('remove', self.remove, this);
                Volumes.each(function(item){
                    sidebar.add(item);
                });
                var fragment = Backbone.history.fragment;
                var route = fragment.split('/');
                if (route[1] !== undefined ) {
                    sidebar.navigate(fragment);
                    content.render();
                }
            }
            $("#sidebar-volume").show();
            this.render();
        },

        fetch: function(success, error) {
            Disks.fetch({
                update: true,
                error: error
            });
            Volumes.fetch({
                update: true,
                success: success,
                error: error
            });
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

            if( route[1] === undefined || Volumes.get(route[1]) === undefined) {  
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
                Disks.fetch({
                    update: true,
                    error: function() {
                        alert("No valid response from Disks API");
                    }
                });
                Volumes.fetch({
                    update: true,
                    error: function() {
                        alert("No valid response from Volumes API");
                    }
                });
                self.poll();
            }, 20000); //TODO need to handle efficiently..!!
        },
        
        _create: function() {
            $("button").addClass("disabled");
            var disks = $("input[name = 'disks']:checked");
            var disk_obj = [];
            var self = this;
            disks.each(function(){
              disk_obj.push($(this).val());
            });
            var volume = new Volumes.model({
                "name"           : $("#cav-vr-name").val(),
                "description"    : $("#cav-vr-desc").val(),
                "size"           : $("#cav-vr-size").val(),
                "type"           : $("#cav-vr-raid option:selected").val(),
                "disks"          : disk_obj,
                "raw"            : $("#cav-vr-raw").is(':checked'),
                "encrypted"      : $("#cav-vr-encr").is(":checked")
            });
            $('button').addClass('disabled');
            volume.save({success: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
            },error: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
            }});
        },

        _delete: function() {
            $("button").addClass("disabled");
            var fragment = Backbone.history.fragment;
            var route = fragment.split('/');
            var self = this;
            var vol = new Volumes.model({
                id: route[1]
            });
            vol.destroy({success: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
                }
            });
        },

        showDialog: function(event) {
            $("button").removeClass("disabled");
            dialog.show(event);
        },

        _edit: function() {
            $("button").addClass("disabled");
            var route = Backbone.history.fragment.split('/');
            vol_id = route[1];
            var disks = $("input[name = 'disks']"),disk_obj=[];

            disks.each(function(){
              obj = {};
              obj['id'] = $(this).val();
              disk_obj.push(obj);
            });

            var volume = new Volumes.model({
                "id"  : vol_id,
                "name"  : $("#cav-vr-name").val(),
                "description" : $("#cav-vr-desc").val(),
                "size" : $("#cav-vr-size").val(),
                "raid" : $("#cav-vr-raid :selected").val(),
                "disks" : disk_obj,
                "raw" : $("#cav-vr-raw").is(':checked'),
                "encryption" : $("#cav-vr-encr").is(":checked")
            });
            $('button').addClass('disabled');
            volume.save(
                {
                    put_method : 'edit'
                }
            );
        },

        _migrate: function(){
            $("button").addClass("disabled");
            var route = Backbone.history.fragment.split('/');

            var disks = $("input[name = 'disks']:checked"), disk_obj=[], self = this;
            disks.each(function(){
                disk_obj.push($(this).val());
            });

            var volume = new Volumes.model({
                "id"    : route[1],
                "raid"  : $("#cav-vr-migrate-raid option:selected").val(),
                "disks" : disk_obj,
                "size"  : Volumes.get(route[1]).toJSON().size,
                "action": "migrate", 
            });

            volume.save({success: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
                }
            });
        },

        _extend: function() {
            var route = Backbone.history.fragment.split('/');
            $("button").addClass("disabled");
            var disks = $("input[name = 'disks']:checked"), disk_obj=[], self = this;
            disks.each(function(){
                disk_obj.push($(this).val());
            });

            var volume = new Volumes.model({
                "id"    : route[1],
                "raid"  : $("#cav-vr-raid option:selected").text(),
                "disks" : disk_obj,
                "size"  : Volumes.get(route[1]).toJSON().size,
                "action": "extend", 
            });

            volume.save({success: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
                }
            });
        },

        _recovery: function(){
            var route = Backbone.history.fragment.split('/');
            $("button").addClass("disabled");
            var disks = $("input[name = 'disks']:checked"), disk_obj=[], self = this;
            disks.each(function(){
                disk_obj.push($(this).val());
            });

            var volume = new Volumes.model({
                "id"    : route[1],
                "raid"  : $("#cav-vr-raid option:selected").text(),
                "disks" : disk_obj,
                "size"  : Volumes.get(route[1]).toJSON().size,
                "action": "recovery", 
            });

            volume.save({success: function(){
                $('#cav-vr-add-edit-modal').modal('hide');
                }
            });
        },

        showPopover: function(e){
            $(e.currentTarget).popover('show');
        },

        hidePopover: function(e) {
            $(e.currentTarget).popover('hide');  
        },


    });

    return VolumesView;
});
