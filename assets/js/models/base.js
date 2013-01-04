define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

    var BaseModel = function (options) {
        // BaseModel initialization code
        Backbone.Model.apply(this, [options]);
    };

    _.extend(BaseModel.prototype, Backbone.Model.prototype, {
    });

    BaseModel.extend = Backbone.Model.extend;

    return BaseModel;
});

