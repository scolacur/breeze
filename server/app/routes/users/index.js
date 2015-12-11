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
		console.log(users);
		res.json(users);
	});
});

//get a single user by id
router.get('/:userId', function (req, res) {
	res.json(_.omit(req.foundUser.toJSON(), ['salt', 'password']));
});

//if the param userId exists in the request, run this code
router.param('userId', function (req, res, next, userId) {
	User.findById(userId)
	.then(function (user) {
		req.foundUser = user;
		next();
	})
	.then(null, next);
});
