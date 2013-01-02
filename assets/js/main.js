require.config({
    paths: {
        jquery: 'libs/jquery-1.8.3.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        mustache: 'libs/mustache',
        text: 'libs/text',
        i18n: 'libs/i18n',
        templates: '../templates'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

define(function(require){
    var App = require('app');
    App.initialize();
});
