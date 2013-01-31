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
          'disks'                   : 'showDisks',
          'disks/:id'               : 'showDisks',
          'volumes'                 : 'routeVolumes',
          'volumes/:id'             : 'routeVolumes',
          'shares'                  : 'routeShares',
          'shares/:id'              : 'routeShares',
          'shares/:type/:id'        : 'routeShares',
          'usergroups'              : 'routeUserGroups',
          'usergroups/:type/:id'    : 'routeUserGroups',
          'backup'                  : 'showBackup',
          'settings'                : 'routeSettings',
          'settings/:id'            : 'routeSettings',
          //Default
          '*actions'                : 'showHome'
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

        showDisks: function(id) {
            disks.load();
        },

        routeVolumes: function(id) {
            volumes.load();
        },

        showShares: function() {
            shares.load();
        },

        routeUserGroups: function(catagory,id) {
            usergroups.load();
        },

        showBackup: function() {
            backup.render();
        },

        routeSettings: function() {
            settings.load();
        },

        showHome: function() {
            home.render();
        }
    });

    return AppRouter;
});
