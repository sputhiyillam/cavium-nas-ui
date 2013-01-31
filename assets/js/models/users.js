define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var UsersModel = BaseModel.extend({
        urlRoot: '/index.php/users/api',
        defaults: {
        },

        initialize: function() {
        },

        edit: function() {
        },

        remove: function() {
        },

        create: function() {
        }
    });

    return UsersModel;
});