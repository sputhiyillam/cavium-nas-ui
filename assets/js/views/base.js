define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache');

    var BaseView = function (options) {
        // BaseView initialization code
        Backbone.View.apply(this, [options]);
        $(".cav-navbar .nav li").removeClass('active');
        var main_menu_item = Backbone.history.fragment.split("/");
        $(".cav-navbar .nav li a[href$='#"+main_menu_item[0]+"']").parent('li').addClass('active');
    };

    _.extend(BaseView.prototype, Backbone.View.prototype, {
        el: $("#content-panel"),
        refresh: function() {
        }
    });

    BaseView.extend = Backbone.View.extend;

    return BaseView;
});
