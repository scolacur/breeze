'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {
		type: String
	},
	users: [{
		type: ObjectId,
		ref: "User"
	}]
});

mongoose.model('Zone', schema);
