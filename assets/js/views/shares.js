define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Mustache = require('mustache'),
        BaseView = require('views/base'),
        sidebarTemplate = require('text!templates/shares_side.html');
        contentTemplate = require('text!templates/shares_main.html');

    var SharesView = BaseView.extend({
        sidebarTemplate: Mustache.compile(sidebarTemplate),
        contentTemplate: Mustache.compile(contentTemplate),

        events: {
          "click #create-share": "createShare",
          "click #create-iscsi": "createIscsi"
        },

        initialize: function (options) {
        }

        render: function() {
        },

        createShare: function() {
        }

        createIscsi: function() {
        }
    });

    return SharesView;
});
