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

    var contentPanel = null;
    var header = null;
    var AppRouter = Backbone.Router.extend({
        routes: {
          'disks'       : 'showDisks',
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
            header.render();/* This is added here, to render header in all pages.*/
            setInterval(function() {
                contentPanel.refresh();
            }, 10000);
        },

        showDisks: function() {
            contentPanel = new DisksView();
            contentPanel.render();
        },

        routeVolumes: function(action, id) {
            contentPanel = new VolumesView();
            contentPanel.navigator(action, id);
        },

        showShares: function() {
            contentPanel = new SharesView();
            contentPanel.render();
        },

        showUserGroups: function() {
            contentPanel = new UsergroupsView();
            contentPanel.render();
        },

        showBackup: function() {
            contentPanel = new BackupView();
            contentPanel.render();
        },

        showSettings: function() {
            contentPanel = new SettingsView();
            contentPanel.render();
        },

        showHome: function() {
            contentPanel = new HomeView();
            contentPanel.render();
        }
    });

    return AppRouter;
});
