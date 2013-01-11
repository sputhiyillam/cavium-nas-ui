define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        BaseModel = require('models/base');

    var VolumesModel = BaseModel.extend({
        defaults: {
            id: null,
            name: "",
            description: "",
			type: "",
            size: "",
            status: "",
            RAID: "",
            disks: [],
            actions: {
                "edit" : false,
                "delete" : false,
                "migrate" : {
                    "to_raid5" : false,
                    "to_raid10" : false,
                },
                "extend" : {
                    "disks" : []
                },
                "recover" : {
                    "disks" : []
                }
            }
        },

        initialize: function() {
        },

        edit: function() {
        },

        remove: function() {
        },

        create: function() {
        }
    });

    return VolumesModel;
});
