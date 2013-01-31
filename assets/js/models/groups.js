define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var GroupsModel = BaseModel.extend({
        urlRoot: '/index.php/groups/api',
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

    return GroupsModel;
});
