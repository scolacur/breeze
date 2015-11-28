var router = require('express').Router();
module.exports = router;

var User = require('mongoose').model('User');
var Camera = require('mongoose').model('Camera');
var Zone = require('mongoose').model('Zone');

//get all zones
router.get('/', function (req, res) {
	console.log('got to zones route');
	Zone.find()
	.then(function (zones) {
		res.json(zones);
	});
});
