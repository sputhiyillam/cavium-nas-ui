define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Backup = require('models/backup');

    var BackupCollection = Backbone.Collection.extend({
        model: Backup,
        url: '/shares',
        initialize: function() {
        }

    });

    return BackupCollection;
});
