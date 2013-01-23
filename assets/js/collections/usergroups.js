define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Usergroups = require('models/usergroups');

    var UsergroupsCollection = Backbone.Collection.extend({
        model: Usergroups,
        url: 'index.php/usergroups/api',
        initialize: function() {
        }

    });

    return new UsergroupsCollection;
});
