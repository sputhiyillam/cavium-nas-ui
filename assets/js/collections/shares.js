define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Shares = require('models/shares');

    var SharesCollection = Backbone.Collection.extend({
        model: Shares,
        url: '/shares',
        initialize: function() {
        }

    });

    return new SharesCollection;
});
