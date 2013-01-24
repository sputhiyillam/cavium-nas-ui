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
            //var accordion = this.accordionTemplate(Volumes.toJSON());
            this.$el.html(SidebarTemplate);
            //$(this.items).html(accordion);
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
            $(this.items).find('a[href$="#volumes/'+model.get('id')+'"]').parent().remove();  
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
            this.$el.html(this.contentTemplate(Volumes.get(route[1]).toJSON()));
            return this;
        },

        add: function() {
        },

        remove: function() {
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
            this.$el.html(this.helpTemplate(Volumes.toJSON()));
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
            var volume = {};
            this.clear();
            var target = $(event.currentTarget).attr("id");
            if (target == 'cav-vr-add-vol') {
                $("#cav-add-model-label").html("Create a New Volume");
                $("#cav-vol-save").show();
                $("#cav-vol-update").hide();
            } else {
                $("#cav-add-model-label").html("Update Volume");
                $("#cav-vol-save").hide();
                $("#cav-vol-update").show();
                var route = Backbone.history.fragment.split('/');
                volume = Volumes.get(route[1]).toJSON();
            }

            //TODO Elegant way of adding 'checked' attribute
            //using underscore methods
            var disks = { "disks": Disks.toJSON() };
            var raid = { "raid": [
                { "value": "span",   "text": "SPAN"   },
                { "value": "raid0",  "text": "RAID 0"  },
                { "value": "raid1",  "text": "RAID 1"  },
                { "value": "raid5",  "text": "RAID 5"  },
                { "value": "raid10", "text": "RAID 10" }
            ]};
            var context = _.extend(volume, disks, raid);
            var htmlText = this.dialogTemplate(context);
            //FIXME Change this to this.$el
            $('#cav-vr-add-edit-modal').html(htmlText);
            return this;
        },

        clear: function() {
            $('button').removeClass('disabled');
            $('#cav-vr-name, #cav-vr-desc, #cav-vr-size').val('');
            $('#cav-vr-encr, #cav-vr-raw, input[name = "disks"]').prop("checked", false);
            $('#cav-vr-raid').val('SPAN');
        }
    });

    var VolumesView = BaseView.extend({
        events: {
            "click #cav-vol-save"       : "_create",
            "click #cav-vol-update"     : "_edit",
            "click #cav-vol-delete"     : "_delete",
            "click #cav-vr-add-vol"     : "showDialog",
            "click #cav-vr-edit-vol"    : "showDialog",
        },

        initialize: function (options) {
             sidebar = new SidebarView;
             content = new ContentView;
             help = new HelpView;
             dialog = new DialogView;
        },

        load: function() {
            var self = this;
            if (Volumes.isEmpty()) {
                sidebar.render();
                var success = function() {
                    Volumes.on('add', self.add, this);
                    Volumes.on('remove', self.remove, this);
                    var fragment = Backbone.history.fragment;
                    var route = fragment.split('/');
                    if (route[1] !== undefined ) {
                        sidebar.navigate(fragment);
                        content.render();
                    }
                };
                var error = function() {
                };
                this.fetch(success, error);
            }
            this.render();
        },

        fetch: function(success, error) {
            Disks.fetch();
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
                self.fetchCollection(self);
            }, 10000);
        },
        
        _create: function() {
            //FIXME Disks should be got in a much
            //more elegant way
            var disks = $("input[name = 'disks']"),
            disk_arr = "[";
            var self = this;
            disks.each(function(){
                disk_arr += $(this).is(':checked') ? "'"+$(this).val()+"' : true ," :  "'"+$(this).val()+"' : false ,";
            });
            disk_arr += "]";
            var volume = new Volumes.model({
                "name"  : $("#cav-vr-name").val(),
                "description" : $("#cav-vr-desc").val(),
                "size" : $("#cav-vr-size").val(),
                "raid" : $("#cav-vr-raid :selected").val(),
                "disks" : disk_arr,
                "raw" : $("#cav-vr-raw").is(':checked'),
                "encryption" : $("#cav-vr-encr").is(":checked")
            });
            $('button').addClass('disabled');
            volume.save();
        },

        _delete: function() {
            var fragment = Backbone.history.fragment;
            var route = fragment.split('/');
            Volumes.get(route[1]).destroy();
        },

        showDialog: function(event) {
            dialog.show(event);
        },

        _edit: function() {
            var route = Backbone.history.fragment.split('/');
            vol_id = route[1];
            var disks = $("input[name = 'disks']"),
            disk_arr = "[";
            //FIXME Disks should be got in a much
            //more elegant way
            disks.each(function(){
                disk_arr += $(this).is(':checked') ? "'"+$(this).val()+"' : true ," :  "'"+$(this).val()+"' : false ,";
            });
            disk_arr += "]";
            var volume = new Volumes.model({
                "id"  : vol_id,
                "name"  : $("#cav-vr-name").val(),
                "description" : $("#cav-vr-desc").val(),
                "size" : $("#cav-vr-size").val(),
                "raid" : $("#cav-vr-raid :selected").val(),
                "disks" : disk_arr,
                "raw" : $("#cav-vr-raw").is(':checked'),
                "encryption" : $("#cav-vr-encr").is(":checked")
            });
            $('button').addClass('disabled');
            volume.save();
        },
    });

    return VolumesView;
});
