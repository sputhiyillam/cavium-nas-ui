define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Disks = require('models/disks');

    var DisksCollection = Backbone.Collection.extend({
        model: Disks,
        url: '/shares',
        initialize: function() {
        }

    });

    return new DisksCollection;
});
