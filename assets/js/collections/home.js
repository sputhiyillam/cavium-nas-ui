define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Home = require('models/home');

    var HomeCollection = Backbone.Collection.extend({
        model: Home,
        url: '/shares',
        initialize: function() {
        }

    });

    return HomeCollection;
});
