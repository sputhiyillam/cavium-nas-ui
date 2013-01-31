define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        SidebarTemplate = require('text!templates/settings/side.html'),
        AccordionTemplate = require('text!templates/settings/accordion.html'),
        HelpTemplate = require('text!templates/settings/help.html'),
        ContentTemplate = require('text!templates/settings/details.html'),
        Settings = require('collections/settings');
    var sidebar, help, content;

    var SidebarView = BaseView.extend({
        el: '#sidebar',
        items: '#sidebar-network-items',
        accordionTemplate : Mustache.compile(AccordionTemplate),
        initialize: function() {
            Settings.on('add',    this.add, this);
            Settings.on('change',this.change,this);
        },

        render: function() {
            this.$el.append(SidebarTemplate);
            return this;
        },

        navigate: function(fragment) {
            $(this.items).find('.cav-active').removeClass('cav-active');
            $(this.items).find('a[href$="/'+fragment+'"]').parent().addClass('cav-active');
        },

        change: function(model){
            console.log("Model has changed ,please update model..!!");
            $(this.items).find('a[href$="/settings/'+model.get('id')+'"]').parent().remove();
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.items).append(accordion);
        },

        add: function(model) {
            var accordion = this.accordionTemplate(model.toJSON());
            $(this.items).append(accordion);
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
        fetch: function(success, error) {
            Settings.fetch({
                update: true,
                success: success,
                error: error
            });
        },
        render: function() {
            this.fetch();
            var route = Backbone.history.fragment.split('/');
            var Obj = Settings.get(route[1]).toJSON();
            var setting = [];
            if(!Settings.isEmpty()){
                Settings.each(function(item){
                    var id = _.pluck(item.get('settings'), 'id');
                    obj = {}; 
                    obj['id'] = item.get('id');
                    obj['name'] = item.get('name');
                    if(_.contains(id, parseInt(route[1], 10))) {
                        volume.push(obj);
                    }
                });
            } 
            var context = _.extend(Obj);
            console.log(context);
            this.$el.html(this.contentTemplate( context ));
            if($("#dhcp-tf").val() === "false"){
                $("#nw-network-mode").val("Static")
            }
            if($("#nw-status").val() === "down"){
                $("#nw-save").attr('disabled',true);
            }else{
                $("#nw-save").attr('disabled',false);
            }
            var dns_server = $("#dns-server").val();
            var values = dns_server.split(",");
            $("#nw-dns_ip1_addr").val(values[0]);
            $("#nw-dns_ip2_addr").val(values[1]);
            $('#nw-dns').is(':checked') ? $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").attr('disabled',true) : $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").attr('disabled',false);
            if($('#nw-lan').text() === "Bond 1"){
                $("#nw-network-aggregation-mode").show();
            }else{
                $("#nw-network-aggregation-mode").hide();
            }
            if ($("#nw-network-mode").val() === "Static"){
                $("#nw-ip,#nw-netmask,#nw-gateway").show();
                $("#nw-dns").attr('disabled',true);
                $("#nw-dns").attr('checked',false);
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").show();
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").attr('disabled',false);
            }else{
                $("#nw-dns").attr('disabled',false);
                $("#nw-ip,#nw-netmask,#nw-gateway").attr('disabled',true);
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").hide();
            }
            return this;
        }
    });

    var HelpView = BaseView.extend({
        el: '#main-content',
        helpTemplate: Mustache.compile(HelpTemplate),
       // contentTemplate: Mustache.compile(ContentTemplate),
        events: {

        },
        initialize: function (options) {
        },
        render: function() {
            this.$el.html(this.helpTemplate(Settings.toJSON()));
            return this;
        }

    });

    var SettingsView = BaseView.extend({
        events: {
           "click #nw-save" : "_edit",
           "click #nw-dns": "showhideTextbox",
           "change #nw-network-mode": "modeChange"
        },

        initialize: function (options) {
            sidebar = new SidebarView;
            content = new ContentView;
            help    = new HelpView;
        },

        load: function() {
            var self = this;
            $(".cav-sidebar").hide();
            if (Settings.isEmpty()) {
                console.log("Settings is empty");
                sidebar.render();
                var success = function() {
                    Settings.on('change', self.change, this);
                    var fragment = Backbone.history.fragment; //settings
                    var route = fragment.split('/'); // settings
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
            } else if($("#sidebar-setting").length === 0) { //if network collection is already full...
               console.log("Settings is not empty");
                sidebar.render();
                Settings.on('change', self._change, this);
                Settings.each(function(item){
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
            $("#sidebar-setting").show();
            this.render();
        },

        fetch: function(success, error) {
            Settings.fetch({
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

            if( route[1] === undefined || Settings.get(route[1]) === undefined) {
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
                Settings.fetch({
                    update: true,
                    
                    error: function() {
                        alert("No valid response from Setting API");
                    }
                });
                self.poll();
            }, 10000); 
        },
        
        /*getCleanIP: function(ip){
            //if (ip=="") return ip;
            if ($.trim(ip)=="") return "";
            pcs=ip.split(".");
            return parseInt(pcs[0],10)+"."+parseInt(pcs[1],10)+"."+parseInt(pcs[2],10)+"."+parseInt(pcs[3],10)
        },
        
        replaceHostInURL: function(newHost){
            var url = window.location.protocol + '//' + newHost;
            if ( window.location.port ) {
                url += ':' + window.location.port;
            }
            url += window.location.pathname + window.location.search;
            return url;
        },*/


        
        _edit: function(){
           var route = Backbone.history.fragment.split('/');
            setting_id = route[1];
            var aggregation = "false";
            var mode = "";
            if($("#nw-lan").text() === "Bond 1"){
                aggregation = "true";
                mode = $("#nw-network-aggregation-mode :selected").val();
            }
            var dhcp = "false"; 
            if($("#nw-network-mode :selected").val() === "DHCP Client" ){
                dhcp = "true";
            }
            var server_ip = [];
            var str1  = $("#nw-dns_ip1_addr").val();
            var str2  = $("#nw-dns_ip2_addr").val();
            if(str1 === "" && str2 === ""){
                var dns_data = $("#dns-server").val();
                var values = dns_data.split(",");
                server_ip = [values[0],values[1]];
            }
            if(str1 == "" && str2 != ""){
                server_ip = [str2];
            }
            if(str1 != "" && str2 === ""){
                server_ip = [str1];
            }
            if(str1 != "" && str2 != ""){
                server_ip = [str1,str2];
            }
            var dns = "false";
            if($("#nw-dns").is(':checked')){
                dns = "true";
                server_ip = [""]; 
            }
            var aggregation_values = {
                "enabled"         : aggregation,
                "mode"            : mode
            }
            var dns_values = {
                "auto"             : dns,
                "servers"          : server_ip
            }
            var setting = new Settings.model({
                "aggregation"     : aggregation_values,
                "dns"             : dns_values,
                "id"              : setting_id,          
                "dhcp"            : dhcp,
                "ip"              : $("#nw-ip").val(),
                "netmask"         : $("#nw-netmask :selected").val(),
                "default_gw"      : $("#nw-gateway").val(),
                "mtu"             : $("#nw-mtu").val()
            });
            
            setting.save({},
                {
                    success: function() {
                       //success timout 2 second
                    },
                    error: function() {
                       //redirect to new ip, if no response from backend   var new_ip = $("#nw-ip").val();
                        var ip = $("#nw-ip").val();
                        window.location.href = ip+"/settings/"+setting_id
                    }
                }
            );
        },
        showhideTextbox: function(){
          $('#nw-dns_ip1_addr,#nw-dns_ip2_addr').toggle(this.checked);
          $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").attr('disabled',false);
        },
        modeChange: function(){
            if ($("#nw-network-mode").val() === "Static"){
                $("#nw-ip,#nw-netmask,#nw-gateway").show();
                $("#nw-ip,#nw-netmask,#nw-gateway").attr('disabled',false);
                $("#nw-dns").attr('disabled',true);
                $("#nw-dns").attr('checked',false);
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").attr('disabled',false);
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").show();
            }else{
                $("#nw-dns").attr('disabled',false);
                $("#nw-ip,#nw-netmask,#nw-gateway").attr('disabled',true);
                $("#nw-dns_ip1_addr,#nw-dns_ip2_addr").hide();
                $("#nw-dns").attr('checked',true);
            }
        }

    });

    return SettingsView;
});
