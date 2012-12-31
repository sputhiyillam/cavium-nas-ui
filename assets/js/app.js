define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, AppRouter) {
    var initialize = function() {
        var app_router = new AppRouter();
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
