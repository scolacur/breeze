var router = require('express').Router();
module.exports = router;

var User = require('mongoose').model('User');
var Camera = require('mongoose').model('Camera');
var Zone = require('mongoose').model('Zone');


//get all cameras
router.get('/', function (req, res) {
	console.log('got to cameras route');
	Camera.find()
	.then(function (cameras) {
		res.json(cameras);
	});
});
