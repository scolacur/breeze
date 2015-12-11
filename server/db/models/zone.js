'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);


var schema = new mongoose.Schema({
	name: {
		type: String
	},
	users: [{
		type: ObjectId,
		ref: "User"
	}]
});

schema.plugin(deepPopulate);


mongoose.model('Zone', schema);
