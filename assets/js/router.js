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
        NavbarView = require('views/navbar');

    var contentPanel = null;
    var navbar = null;
    var AppRouter = Backbone.Router.extend({
        routes: {
          'disks'       : 'showDisks',
          'volumes'     : 'showVolumes',
          'shares'      : 'showShares',
          'usergroups'  : 'showUserGroups',
          'backup'      : 'showBackup',
          'settings'    : 'showSettings',
          //Default
          '*actions'    : 'showHome'
        },

        initialize: function() {
            navbar = new NavbarView();
            setInterval(function() {
                contentPanel.refresh();
            }, 10000);
        },

        showDisks: function() {
            var view = new DisksView();
            view.render();
        },

        showVolumes: function() {
            var view = new VolumesView();
            view.render();
        },

        showShares: function() {
            var view = new SharesView();
            view.render();
        },

        showUserGroups: function() {
            var view = new UsergroupsView();
            view.render();
        },

        showBackup: function() {
            var view = new BackupView();
            view.render();
        },

        showSettings: function() {
            var view = new SettingsView();
            view.render();
        },

        showHome: function() {
            contentPanel = new HomeView();
            navbar.render();
            contentPanel.render();
        }
    });

    return AppRouter;
});
