define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/usergroups/side.html'),
        AccordionTemplate = require('text!templates/usergroups/accordion.html'),
        HelpTemplate = require('text!templates/usergroups/help.html'),
        ContentTemplate = require('text!templates/usergroups/details.html'),
        DialogTemplate = require('text!templates/usergroups/dialog.html'),
        Users = require('collections/users'),
        Groups = require('collections/groups'),
        Volumes = require('collections/volumes');

    var sidebar, help, content, dialog;

    var SidebarView = BaseView.extend({
        el: '#sidebar',
        gp_items: '#sidebar-group-items',
        u_items: "#sidebar-user-items",
        accordionTemplate : Mustache.compile(AccordionTemplate),
        initialize: function() {
            Users.on('add',    this.addUser, this);
            Users.on('remove', this.removeUser, this);
            Groups.on('add',    this.addGroup, this);
            Groups.on('remove', this.removeGroup, this);
        },

        render: function() {
            var route = Backbone.history.fragment.split('/');
            if (route[0] === 'usergroups'){
                this.$el.append(SidebarTemplate);
            }
            return this;
        },

        navigate: function(fragment) {
            var nav = ".accordion-inner";
            $(nav).removeClass('cav-active');
            $(nav).find('a[href$="/'+fragment+'"]').parent().addClass('cav-active');
        },

        addUser: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.u_items).append(accordion);
        },

        addGroup: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.gp_items).append(accordion);
        },

        removeUser: function(model) {
            var fragment = Backbone.history.fragment;
            $(this.u_items).find('a[href$="'+fragment+'"]').parent().remove();  
        },

        removeGroup: function(model) {
            var fragment = Backbone.history.fragment;
            $(this.gp_items).find('a[href$="'+fragment+'"]').parent().remove();  
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
            var route = Backbone.history.fragment.split('/');
            if (route[0] === 'usergroups'){
                this.$el.html(this.helpTemplate());
            }
            return this;
        },

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
            if(route[1] === 'users'){
                this.$el.html(this.contentTemplate(Users.get(route[2]).toJSON()));
            } else if(route[1] === 'groups') {
                this.$el.html(this.contentTemplate(Groups.get(route[2]).toJSON()));
            }
            return this;
        },

        add: function() {
        },

        remove: function() {
        },
    });

    var DialogView = BaseView.extend({
        el: '#ug-add-edit-modal',
        dialogTemplate: Mustache.compile(DialogTemplate),
        events: {
        },

        initialize: function (options) {
        },

        show: function(event) {
            var route = Backbone.history.fragment.split('/');
            var misc = {}, users = {}, groups = {} , context = {}, volume = {}, pri_share = {};
            this.clear();
            var target = $(event.currentTarget).attr("id");
            if(target === 'ug-add-user'){
                volume = { 'volumes' : Volumes.toJSON() };
                misc = { 'user' : true };
                groups = { 'allgroups' : Groups.toJSON() }; 
                if(Volumes.isEmpty()) {
                    pri_share = { 'private_share' : false };
                } else {
                    pri_share = { 'private_share' : true };
                }
                context = _.extend(users, groups, volume, misc, pri_share);
            } else if(target === 'ug-edit-user'){
                misc = { 'user' : true };
                users = Users.get(route[2]).toJSON();
                var user_groups = _.pluck(users.groups, 'id');
                var new_group = [];
                _.each(Groups.toJSON(), function(item){
                    var obj = {};
                    obj['id'] = item.id;
                    obj['name'] = item.name;

                    if(_.contains(user_groups , parseInt(item.id, 10))){
                        obj['checked'] = true;
                    } else {
                        obj['checked']  = false;
                    }
                    new_group.push(obj);
                });
                groups = { 'allgroups' : new_group };
                context = _.extend(users, groups, volume, misc, pri_share);
            } else if (target === 'ug-add-group'){
                var usersExist = {}
                if (Users.isEmpty()){
                    misc = { 'user' : false , 'usersExist' : false };
                } else {
                    misc = { 'user' : false , 'usersExist' : true };
                }
                users = Users.toJSON();
                context = _.extend(groups,{"users":users}, misc);
            } else {
                var usersExist = {}
                var group = Groups.get(route[2]).toJSON();
                var user_ids = _.pluck(group.users, 'id');
                if (Users.isEmpty()){
                    misc = { 'user' : false , 'usersExist' : false };
                } else {
                    misc = { 'user' : false , 'usersExist' : true };
                    new_users = [];
                    _.each(Users.toJSON(), function(item){
                        var obj = {};
                        obj['id'] = item.id;
                        obj['name'] = item.name;
                        if(_.contains(user_ids , parseInt(item.id, 10))){
                            obj['selected'] = true;
                        } else {
                            obj['selected'] = false;
                        }
                        new_users.push(obj);
                    });
                    context = _.extend(group,{'users' : new_users}, misc);
                }   
            }
            var htmlText = this.dialogTemplate(context);
            $(this.$el.selector).html(htmlText);
            return this;
        },

        clear: function() {
            $('button').removeClass('disabled');
            $('#ug-name, #ug-fullname, #ug-email, #ug-pwd, #ug-conf-pwd, #ug-groups').val('');
            $('#ug-allow-admin, .ug-groups, #ug-http, #ug-https, #ug-ftp, #ug-ftp-ssl, #ug-nfs, #ug-sf-encr, #ug-private-sf').prop("checked", false);
        }
    });

    var UsergroupsView = BaseView.extend({
        events: {
            "click a[href='#ug-add-edit-modal']"    : "showDialog",
            "click #ug-user-save"                   : "_createUser",
            "click #ug-user-update"                 : "_editUser",
            "click #ug-gp-save"                     : "_createGp",
            "click #ug-gp-update"                   : "_updateGp",
            "click #ug-delete"                      : "_delete"
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
            if (Users.isEmpty() && Groups.isEmpty()) {
                if($("#sidebar-usergroups").length === 0){
                    sidebar.render();
                }
                var fragment = Backbone.history.fragment;
                var route = fragment.split('/');

                var success_gp = function() {
                    Groups.on('add', self._addGroup, this);
                    Groups.on('remove', self._removeGroup, this);
                    if (route[1] !== undefined && route[2] !== undefined && route[1] === 'groups' ) {
                        sidebar.navigate(fragment);
                        content.render();
                    }
                    self.poll_group();
                };

                var success_users = function() {
                    Users.on('add', self._addUser, this);
                    Users.on('remove', self._removeUser, this);
                    if (route[1] !== undefined && route[2] !== undefined && route[1] === 'users') {
                        sidebar.navigate(fragment);
                        content.render();
                    }
                    self.poll_user();
                };

                var error_gp = function() {
                    alert("Group failed to get response");
                };

                var error_user = function() {
                    alert("Users failed to get response");
                };

                this.fetch(success_gp, success_users , error_gp, error_user);
            } else if($("#sidebar-usergroups").length === 0) {
                sidebar.render();
                Users.on('add', self._addUser, this);
                Users.on('remove', self._removeUser, this);
                Groups.on('add', self._addGroup, this);
                Groups.on('remove', self._removeGroup, this);

                if(Users.isEmpty()){
                    Users.fetch({update:true, success: function(){
                        self.poll_user();
                    }});
                } else {
                    Users.each(function(item){
                        sidebar.addUser(item);
                    });
                }

                if(Groups.isEmpty()){
                    Groups.fetch({update: true, success: function(){
                        self.poll_group();
                    }});
                } else {
                    Groups.each(function(item){
                        sidebar.addGroup(item);
                    });
                }


                var fragment = Backbone.history.fragment;
                var route = fragment.split('/');
                if (route[1] !== undefined ) {
                    sidebar.navigate(fragment);
                    content.render();
                }
            }
            $("#sidebar-usergroups").show();
            this.render();
        },

        fetch: function(success_users, success_gp , error_gp, error_user) {
            Users.fetch({
                update: true,
                success: success_users,
                error: error_user
            });
            Groups.fetch({
                update: true,
                success: success_gp,
                error: error_gp
            });
            if (Volumes.isEmpty()){
                Volumes.fetch();
            }
        },

        _addUser: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is added to a collection.
        },

        _removeUser: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is removed from a collection.
        },

        _addGroup: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is added to a collection.
        },

        _removeGroup: function(model, collection, options) {
            // TODO: Show growl notification
            // when a model is removed from a collection.
        },

        render: function() {
            var fragment = Backbone.history.fragment;
            var route = fragment.split('/');
            if( route[1] === undefined || Users.get(route[2]) === undefined ||
                Groups.get(route[2]) === undefined) {  
                help.render();
            } else {
                sidebar.navigate(fragment);
                content.render();
            }
            return this;
        },

        poll_group: function(){
            var self = this;
            setTimeout(function() {
               Groups.fetch({
                update: true
               });
            }, 20000);
        },

        poll_user: function(){
            var self = this;
            setTimeout(function() {
               Users.fetch({
                update: true
               });
            }, 20000);
        },
        
        _createUser: function() {

            var groups = [];
            $(".ug-groups ").each(function(){
                $(this).is(":checked") ? groups.push(parseInt($(this).val() ,10)) : '' ;
            });


            var user = new Users.model({
                "name"          :   $('#ug-name').val(),
                "fullname"      :   $('#ug-fullname').val(),
                "email"         :   $('#ug-email').val(),
                "password"      :   $('#ug-pwd').val(),
                "admin"         :   $('#ug-allow-admin').is(":checked"),
                "groups"        :   groups,
                "private_share" :   $('#ug-private-sf').is(":checked"),
                "share"         : {
                    "name"      : $('#ug-name').val(),
                    "volume"    : {
                        'id'    : parseInt($('#ug-volume option:selected').val(), 10)
                    },
                    "services"  : {
                        "http"      : $("#ug-http").is(':checked'),
                        "https"     : $("#ug-https").is(':checked'),
                        "nfs"       : $("#ug-nfs").is(':checked'),
                        "ftp"       : $("#ug-ftp").is(':checked'),
                        "ftp-ssl"   : $("#ug-ftp-ssl").is(':checked')
                    },
                "encrypted"     : $('#ug-sf-encr').is(':checked')
                }
            });
            $("button").addClass("disabled");
            user.save({
                success: function(){
                    Users.fetch({update: true});
                }
            });
        },

        _editUser : function() {
            var groups = [];
            $(".ug-groups ").each(function(){
                $(this).is(":checked") ? groups.push(parseInt($(this).val() ,10)) : '' ;
            });

            var route = Backbone.history.fragment.split("/");

            var user = new Users.model({
                "id"        :   parseInt(route[2], 10),
                "name"      :   $('#ug-name').val(),
                "fullname"  :   $('#ug-fullname').val(),
                "email"     :   $('#ug-email').val(),
                "password"  :   $('#ug-pwd').val(),
                "admin"     :   $('#ug-allow-admin').is(":checked"),
                "groups"    :   groups
            });
            $("button").addClass("disabled");
            user.save({
                success: function(){
                    Users.fetch({update: true});
                }
            });
        },

        _createGp: function() {
            var users = [];
            $("#ug-users option:selected").each(function(){
                users.push(parseInt($(this).val(), 10));
            });

            var group = new Groups.model({
                "name"          : $('#ug-name').val(),
                "description"   : $('#ug-description').val(),
                "users"         : users
            });
            $("button").addClass("disabled");
            group.save({
                success: function(){
                    Groups.fetch({update: true});
                }
            });
        },

        _updateGp: function() {
            var route = Backbone.history.fragment.split("/");
            var users = [];
            $("#ug-users option:selected").each(function(){
                users.push(parseInt($(this).val(), 10));
            });

            var group = new Groups.model({
                "id"            : parseInt(route[2], 10),
                "name"          : $('#ug-name').val(),
                "description"   : $('#ug-description').val(),
                "users"         : users
            });
            $("button").addClass("disabled");
            group.save({success: function(){
                Groups.fetch({update: true});
            }});
        },

        _delete: function() {
            var route = Backbone.history.fragment.split('/');
            var self = this;
            if(route[1] === 'users') {
                var user = new Users.model({
                    id: route[2]
                });
                user.destroy({
                    success: function(){
                       $('#ug-confirm-dialog').modal('hide');
                       Users.fetch({update: true});
                    },
                    error: function(){
                        $('#ug-confirm-dialog').modal('hide');
                    }
                });

            } else {
                var gp = new Groups.model({
                    id: route[2]
                });
                gp.destroy({
                    success: function(){
                        $('#ug-confirm-dialog').modal('hide');
                        Groups.fetch({update: true});
                    },
                    error: function(){
                        $('#ug-confirm-dialog').modal('hide');
                    }
                });
            }

        },

        showDialog: function(event) {
            $("button").removeClass("disabled");
            dialog.show(event);
        }

    });

    return UsergroupsView;
});
