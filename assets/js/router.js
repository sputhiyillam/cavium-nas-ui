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
        SettingsView = require('views/settings');

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
            var view = new HomeView();
            view.render();
        }
    });

    return AppRouter;
    //var initialize = function(){
    //    var app_router = new AppRouter();
    //    Backbone.history.start();
    //};

    //return {
    //    initialize: initialize
    //};
});
