define(function(require){

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        HomeView = require('views/home'),
        DisksView = require('views/disks'),
        VolumesView = require('views/volumes'),
        SharesView = require('views/shares'),
        UsergroupsView = require('views/usergroups'),
        BackupView = require('views/backup'),
        SettingsView = require('views/settings'),
        HeaderView = require('views/header');

    var header, volumes, shares, home, disks, usergroups, backup, settings;
    var AppRouter = Backbone.Router.extend({
        routes: {
          'disks'       : 'routeDisks',
          'disks/:id' : 'routeDisks',
          'volumes'     : 'routeVolumes',
          'volumes/:action/:id' : 'routeVolumes',
          'shares'      : 'showShares',
          'usergroups'  : 'showUserGroups',
          'backup'      : 'showBackup',
          'settings'    : 'showSettings',
          //Default
          '*actions'    : 'showHome'
        },

        initialize: function() {
            header = new HeaderView();
            volumes = new VolumesView();
            shares = new SharesView();
            home = new HomeView();
            disks = new DisksView();
            usergroups = new UsergroupsView();
            backup = new BackupView();
            settings = new SettingsView();
            this.on('route', header.render, header);
        },

        routeDisks: function(action, id) {
            disks.load();
            header.render();
        },

        routeVolumes: function(action, id) {
            volumes.load();
            header.render();
        },

        showShares: function() {
            shares.render();
            header.render();
        },

        showUserGroups: function() {
            usergroups.render();
            header.render();
        },

        showBackup: function() {
            backup.render();
            header.render();
        },

        showSettings: function() {
            settings.render();
            header.render();
        },

        showHome: function() {
            home.render();
            header.render();
        }
    });

    return AppRouter;
});
