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
          'disks'       : 'showDisks',
          'volumes'     : 'routeVolumes',
          'volumes/:id' : 'routeVolumes',
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
           /* this.on('routes', function(page) {
                console.log("coming here...");
            });
*/
        },
        showDisks: function() {
            disks.render();
            header.render();
        },

        routeVolumes: function(id) {
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
