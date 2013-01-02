define(function(require){
    var $ = require('jquery'),
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
