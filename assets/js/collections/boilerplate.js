define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BoilerPlate = require('models/boilerplate');

    var BoilerPlateCollection = Backbone.Collection.extend({
        model: BoilerPlate,
        url: '/shares',
        initialize: function() {
        }

    });

    return BoilerPlateCollection;
});
