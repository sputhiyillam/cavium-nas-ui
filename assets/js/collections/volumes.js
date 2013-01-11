define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Volumes = require('models/volumes');
    var VolumesCollection = Backbone.Collection.extend({
        model: Volumes,
        url: 'index.php/volumes/api/format/json',
        initialize: function() {
        }
    });

    return new VolumesCollection;
});
