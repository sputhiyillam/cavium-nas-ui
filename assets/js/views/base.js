define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache');

    var BaseView = function (options) {
        // BaseView initialization code
        Backbone.View.apply(this, [options]);
    };

    _.extend(BaseView.prototype, Backbone.View.prototype, {
        el: $(".cav-content-panel")
    });

    BaseView.extend = Backbone.View.extend;

    return BaseView;
});
