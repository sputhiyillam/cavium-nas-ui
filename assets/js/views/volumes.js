define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/volumes_side.html'),
        AccordionTemplate = require('text!templates/volumes_accordion.html'),
        HelpTemplate = require('text!templates/volumes_help.html'),
        ContentTemplate = require('text!templates/volumes_details.html'),
        Volumes = require('collections/volumes');

    var VolumesSidebarView = BaseView.extend({
        el: '#sidebar',
        sidebarItem: '#cav-sidebar-vr-items',
        accordionTemplate : Mustache.compile(AccordionTemplate),
        render: function() {
            var accordion = this.accordionTemplate(Volumes.toJSON());
            this.$el.html(SidebarTemplate);
            $(this.sidebarItem).html(accordion);
            return this;
        },

        showActiveMenu: function(fragment) {
            $(this.sidebarItem).find('a[href$="#'+fragment+'"]').parent().addClass('cav-active');
        },

        addNewItem: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.sidebarItem).append(accordion);
        },

        removeItem: function(model) {
            $(this.sidebarItem).find('a[href$="#volumes/'+model.get('id')+'"]').parent().remove();  
        }
    });

    var VolumesContentView = BaseView.extend({
        el: '#main-content',
        contentTemplate: Mustache.compile(ContentTemplate),
        events: {

        },
        initialize: function (options) {
        },
        render: function() {
            var route = Backbone.history.fragment.split('/');
            this.$el.html(this.contentTemplate(Volumes.get(route[1]).toJSON()));
            return this;
        },
    });


    var VolumesHelpView = BaseView.extend({
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

    var VolumesView = BaseView.extend({
        events: {
            "click #cav-vr-add-vol"     : "resetAddPanel",
            "click #cav-vol-save"       : "createVolume",
            "click #cav-vr-edit-vol"    : "updateEditPanel",
            "click #cav-vol-update"     : "updateVolume",
            "click #cav-vol-delete"     : "deleteVolume",

        },

        initialize: function (options) {
             Volumes.on('remove', this._remove,    this);
        },

        load: function() {
            //TODO : refresh stops when user revisits previously visited from another page.
            if (Volumes.isEmpty()) {
                this.fetchCollection(this);
            } else {
                this.render();
            }
        },

        fetchCollection: function(self) {
            var volumes = Volumes.toJSON();
            var route = Backbone.history.fragment.split('/');
            if(route[0] === 'volumes') {
                Volumes.fetch({
                    update: true,
                    success: _.bind(function() {
                        if(_.isEmpty(volumes)) {
                            // to stop repainting...
                            self.render();
                            Volumes.on('add',    this._add, this);
                        }
                        self.pollVolume();
                        // TODO: Show growl notification
                    }, self),
                    error: _.bind(function() {
                       self.pollVolume();
                        // TODO: Show growl notification
                    }, self)
                });
            }
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            if(route[0] === 'volumes') {
                var sidebar = new VolumesSidebarView;
                sidebar.render();
                var fragment = Backbone.history.fragment;
                var route = fragment.split("/");
                var helpView = new VolumesHelpView;

                if( route[1] === undefined || Volumes.get(route[1]) === undefined) {  
                    helpView.render();
                } else if(route[1] !== '') {
                    sidebar.showActiveMenu(fragment);
                    // render main template...
                    var contentView = new VolumesContentView;
                    contentView.render();
                }
                return this;
            }
        },

        pollVolume: function(){
            // to poll volume collections.
            var route = Backbone.history.fragment.split('/');
            var self = this;
            setTimeout(function() {
                if(route[0] === 'volumes') {
                    self.fetchCollection(self);
                }
            }, 10000);
        },
        
        clearAllTimeout: function() {
            //to clear previous setTimeout events.
            var highest_timeout_id = setTimeout(";");
            for(var j=0; j<highest_timeout_id; j++){
                clearTimeout(j);
            }
        },

        _add: function(model, collection, options) {
            // when a model is added to a collection.
            var sidebar = new VolumesSidebarView;
            sidebar.addNewItem(model);
        },

        _remove: function(model, options) {
            // remove model from collection
            var sidebar = new VolumesSidebarView;
            sidebar.removeItem(model);
            var route = Backbone.history.fragment.split('/');
            var id = String(model.get('id'));
            if(route[1] === id) {
                var helpView = new VolumesHelpView;
                helpView.render();
            }
        },

        resetAddPanel: function() {
        //To reset add panel.
            $("#cav-add-model-label").html("Create a New Volume");
            $("#cav-vol-save").show();
            $("#cav-vol-update").hide();
        },

        clearUpdatePanel: function() {
        //To reset add and update panel.
            $('button').removeClass('disabled');
            $('#cav-vr-name, #cav-vr-desc, #cav-vr-size').val('');
            $('#cav-vr-encr, #cav-vr-raw, input[name = "disks"]').prop("checked", false);
            $('#cav-vr-raid').val('SPAN');
        },

        createVolume: function() {
        //To create volume
            var id = '', action = 'create' ;
            this.updateVolume('create', id);
        },

        deleteVolume: function() {
            $('.btn, .close').addClass('disabled').removeAttr('data-dismiss');
            var fragment = Backbone.history.fragment;
            var route = fragment.split("/");
            var self = this;
            var modal = Volumes.get(route[1]);
            this.clearAllTimeout(); //To clear remaining timeout.
            Backbone.sync('delete', Volumes.get(route[1]), {
            url: 'index.php/volumes/api/id/'+ route[1],
            success: function(data) {
                $('.modal').modal('hide');
                self._remove(Volumes.get(route[1]));
                self.fetchCollection(self);
            },
            error: function(data) {
                alert(data.error);
                console.log('Model deleted failed');
            }
            });
        },

        updateEditPanel: function() {
            //to populate edit panel with selected model data
            this.clearUpdatePanel();
            $("#cav-add-model-label").html("Update Volume");
            $("#cav-vol-save").hide();
            $("#cav-vol-update").show();

            var route = Backbone.history.fragment.split('/');
            var volume = Volumes.get(route[1]); //TODO
            $('#cav-vr-name').val(volume.get('name'));
            $('#cav-vr-desc').val(volume.get('description'));
            $('#cav-vr-size').val(volume.get('size').split(" ")[0]);
            $('#cav-vr-encr').prop("checked", volume.get('encryption'));
            $('#cav-vr-raw').prop("checked", volume.get('raw'));
            $('#cav-vr-raid').val(volume.get('raid'));
            _.each(volume.get('disks'),function(disk){
                $(':checkbox[value='+disk.name+']').prop("checked",true);
            });
        },

        updateVolume: function(operation, vol_id) {
        // to route create and update method based on id.
            if(vol_id === undefined) {
                var route = Backbone.history.fragment.split('/');
                vol_id = route[1];
                operation = 'update';
            }
            var disks = $("input[name = 'disks']"),
            disk_arr = "[";
            var self = this;
            disks.each(function(){
                disk_arr += $(this).is(':checked') ? "'"+$(this).val()+"' : true ," :  "'"+$(this).val()+"' : false ,";
            });
            disk_arr += "]";
            var volume = new Volumes.model({
                "id"  : vol_id,
                "name"  : $("#cav-vr-name").val(),
                "description" : $("#cav-vr-desc").val(),
                "used" : "0 GB",
                "size" : $("#cav-vr-size").val(),
                "raid" : $("#cav-vr-raid :selected").val(),
                "disks" : disk_arr,
                "raw" : $("#cav-vr-raw").is(':checked'),
                "encryption" : $("#cav-vr-encr").is(":checked")
            });
            $('button').addClass('disabled');
            this.doSync(volume, operation);
        },

        doSync: function(model, action) {
            // common method to sync for create and update method
            var self = this, 
                navigate_url = '#volumes',
                model_window = $('#cav-vr-add-edit-modal');
            this.clearAllTimeout();
            if(model.get('id') !== ''){
                navigate_url = "#volumes/" + model.get('id');
            }
            Backbone.sync(action, model, {
            url: 'index.php/volumes/api',
            success: function(data){
                model_window.modal('hide');
                self.fetchCollection(self);
                Backbone.history.navigate(navigate_url, true);
            },
            error: function(data){
                alert(data.error);
                console.log('Model addition failed');
            }
            });
        },
    });
    return VolumesView;
});