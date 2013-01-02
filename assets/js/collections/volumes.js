define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Volumes = require('models/volumes');

    var VolumesCollection = Backbone.Collection.extend({
        model: Volumes,
        url: '/shares',
        initialize: function() {
        }

    });

    return new VolumesCollection;
});
