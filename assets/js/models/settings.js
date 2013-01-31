define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var SettingsModel = BaseModel.extend({
       urlRoot: '/index.php/settings/api',

        initialize: function() {
            
        },

        edit: function() {
        },

        remove: function() {
        },

        create: function() {
        }
    });

    return SettingsModel;
});
