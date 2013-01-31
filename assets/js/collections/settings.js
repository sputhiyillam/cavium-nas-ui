define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Settings = require('models/settings');

    var SettingsCollection = Backbone.Collection.extend({
        model: Settings,
        url: '/index.php/settings/api',
        initialize: function() {
        }

    });

    return new SettingsCollection;
});
