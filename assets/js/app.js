define(function(require){
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('router');
    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
