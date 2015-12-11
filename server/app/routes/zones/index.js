var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var User = mongoose.model('User');
var Camera = mongoose.model('Camera');
var Zone = mongoose.model('Zone');

var deepPopulate = require('mongoose-deep-populate')(mongoose);

//get all zones
router.get('/', function (req, res) {
	console.log('got to zones route');
	Zone.find()
	.then(function (zones) {
		res.json(zones);
	});
});

//get all users for a given zone

router.get('/tenants', function (req, res) {
	console.log('got to zones/tenants route');
	Zone.findOne({_id: req.body.id}).exec()
	.then(function(zone){
		return User.find({zone: zone});
	})
	.then(function (users) {
		users = users.map(function (user) {
			return _.omit(user.toJSON(), ['salt', 'password']);
		});
		res.json(users);
	});
});

/*Check if plate matches a user in a given zone*/
router.get('/:zoneId/:plate', function(req,res,next){
	Zone.findById(req.params.zoneId).deepPopulate("users.plates")
	.then(function(zone){
		var match = zone.users.some(function(user){
			return user.plates.indexOf(req.params.plate) > -1;
		});
		res.json(match);
	}).then(null, next);
});

/*
Request comes in with zone and plate
find all users in the zone
loop through their plates
if any of those plates == req.params.plate, return true
if not, return false
otherwise, send an error
*/
