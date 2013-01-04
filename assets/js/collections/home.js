define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Home = require('models/home');

    var HomeCollection = Backbone.Collection.extend({
        model: Home,
        url: 'index.php/shares/api/format/json',
        initialize: function() {
        }

    });

    return new HomeCollection;
});
