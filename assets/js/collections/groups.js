define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Groups = require('models/groups');

    var GroupsCollection = Backbone.Collection.extend({
        model: Groups,
        url: '/index.php/groups/api',
        initialize: function() {
        }

    });

    return new GroupsCollection;
});
