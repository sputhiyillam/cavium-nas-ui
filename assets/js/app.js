define(function(require){
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('router');
    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.history.start({
            pushState: true
        });
        $(document).on("click", "a[href^='/']", function(event) {
          if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            var url = $(event.currentTarget).attr("href").replace(/^\//, "");
            app_router.navigate(url, { trigger: true });
          }
        });
    };

    return {
        initialize: initialize
    };
});
