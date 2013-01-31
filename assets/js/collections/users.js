define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Users = require('models/users');

    var UsersCollection = Backbone.Collection.extend({
        model: Users,
        url: '/index.php/users/api',
        initialize: function() {
        }

    });

    return new UsersCollection;
});
