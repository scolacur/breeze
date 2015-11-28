'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
    zone: {
        type: ObjectId,
		ref: 'Zone',
		required: true
    }
});

mongoose.model('Camera', schema);
