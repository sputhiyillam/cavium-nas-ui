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
          "click #cav-vr-add-vol" : "resetAddPanel",
          "click #cav-vol-save" : "createVolume",
          "click #cav-vol-delete"  : "deleteVolume",
          "click #cav-vr-edit-vol" : "updateEditPanel",
          "click #cav-vol-update" : "updateVolume",
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

        pollVolume: function(){
          // to poll collections
          var self = this;
          setTimeout(function() {
              self.fetchCollection(self);
            }, 10000);
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
            console.log("coming inside fetchCollection!!");
          // if any modal window opened then stop from fetch() operation.
            Volumes.fetch({
                update: true,
                success: _.bind(function() {
                    self.render();
                    self.pollVolume();
                    // TODO: Show growl notification
                }, self),
                error: _.bind(function() {
                   self.pollVolume();
                    // TODO: Show growl notification
                }, self)
            });
          } else {
            console.log("Coming inside else fetchCollection !!");
            // calling pollVolume callback again, if modal window opened.
            self.pollVolume();
          }
        },

        load: function() {
            if (Volumes.isEmpty()) {
                this.fetchCollection(this);
            } else {
                this.render();
            }
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
            $(".modal-backdrop").remove();
        },

        resetAddPanel: function() {
          //To reset add panel.
          $("#cav-add-model-label").html("Create a New Volume");
          $("#cav-vol-save").show();
          $("#cav-vol-update").hide();
          this.resetUpdatePanel();
        },

        doSync: function(model, action) {
          // common method to sync for create and update method
          var self = this, navigate_url = '#volumes';
          this.clearAllTimeout();
          if(model.get('id') !== ''){
            navigate_url = "#volumes/" + model.get('id');
          }
          Backbone.sync(action, model, {
            url: 'index.php/volumes/api',
            success: function(data){
              $(".modal-backdrop").remove();
              self.fetchCollection(self);
              Backbone.history.navigate(navigate_url, true);
            },
            error: function(data){
              alert(data.error);
              console.log('Model addition failed');
            }
          });
        },

        resetUpdatePanel: function() {
          //To reset add and update panel.
          $('#cav-vr-name').val('');
          $('#cav-vr-desc').val('');
          $('#cav-vr-size').val('');
          $('#cav-vr-encr').prop("checked", false);
          $('#cav-vr-raw').prop("checked", false);
          $('#cav-vr-raid').val('SPAN');
          $("input[name = 'disks']").each(function(){
              $(this).prop('checked', false);
          });
        },

        createVolume: function() {
          //To create volume
          var id = '', action = 'create' ;
          this.updateVolume('create', id);
        },

        deleteVolume: function() {
          $('.modal').modal('hide');
          var fragment = Backbone.history.fragment;
          var route = fragment.split("/");
          var self = this;
          var modal = Volumes.get(route[1]);
          this.clearAllTimeout(); //To clear remaining timeout.
          Backbone.sync('delete', Volumes.get(route[1]), {
            url: 'index.php/volumes/api/id/'+ route[1],
            success: function(data) {
              self.fetchCollection(self);
              Backbone.history.navigate('#volumes', true);
            },
            error: function(data) {
              alert(data.error);
              console.log('Model deleted failed');
            }
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
          $('#cav-vr-add-edit-modal').hide().removeClass('in');
          this.doSync(volume, operation);
        },

        updateEditPanel: function() {
          //to populate edit panel with selected model data
          this.resetUpdatePanel();
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

        reset: function(collection, options) {
            // when the collection's entire contents have been replaced.
            console.log('reset');
        },

        render: function() {

          if(!$(".modal").hasClass('in')) {
          // If modal window opened stop updating views
            this.$('#sidebar').html(this.sidebarTemplate(Volumes.toJSON()));
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
            // TODO Handle page not found
            return this;
          }
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
            console.log('Model Changed for Volume');
        },

        destroy: function(model, collection, options) {
            console.log("calling destroy");
            console.log(this.model);

            //when a model is destroyed.
        },

        request: function(model, xhr, options) {
          $(".cav-spinner").show();
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
