define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var BoilerPlateModel = BaseModel.extend({
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

    return BoilerPlateModel;
});
