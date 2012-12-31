require.config({
    paths: {
        jquery: 'libs/jquery-1.8.3.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        mustache: 'libs/mustache',
        text: 'libs/text',
        i18n: 'libs/i18n',
        templates: '../templates'
    }
});

require(['app'], function(App) {
    App.initialize();
});
