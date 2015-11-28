var router = require('express').Router();
module.exports = router;

var _ = require('lodash');

var User = require('mongoose').model('User');
var Camera = require('mongoose').model('Camera');
var Zone = require('mongoose').model('Zone');

//get all users
router.get('/', function (req, res) {
	console.log('got to users route');
	User.find()
	.then(function (users) {
		users = users.map(function (user) {
			return _.omit(user.toJSON(), ['salt', 'password']);
		});
		res.json(users);
	});
});
