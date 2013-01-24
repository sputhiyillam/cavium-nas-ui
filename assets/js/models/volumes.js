define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var VolumesModel = BaseModel.extend({
        url: '/index.php/volumes/api',
        initialize: function() {
        },

        edit: function() {
        },

        remove: function() {
        },

        create: function() {
        }
    });

    return VolumesModel;
});
