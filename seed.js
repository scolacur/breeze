/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Zone = Promise.promisifyAll(mongoose.model('Zone'));
var Camera = Promise.promisifyAll(mongoose.model('Camera'));



var seedUsers = function () {

    var users = [
        {
            email: 't1@nsa.com',
            password: 'password',
			plates: [
				'YGA91B',
				'J2GB1i'
			]
        },
		{
			email: 't2@nsa.com',
			password: 'pathword',
			plates: [
				'YGA94B',
				'ABCDEF'
			]
		},
        {
            email: 'obama@gmail.com',
            password: 'potus',
			plates: [
				'LMNOP3'
			]
        }
    ];
    // return User.createAsync(users);
	return Promise.resolve(User.create(users));
};

var seedZones = function() {

	return Promise.all([
		User.findOne({email: 't1@nsa.com'}).exec(),
		User.findOne({email: 't2@nsa.com'}).exec(),
		User.findOne({email: 'obama@gmail.com'}).exec()
		]).then(function(users){
			console.log("USERS: ",users);
			var zones = [
				{
					name: 'Obama\'s Zone',
					users: [
						users[2]._id
					]
				},
				{
					name: 't1\'s Zone',
					users: [
						users[0]._id
					]
				},
				{
					name: 't2\'s Zone',
					users: [
						users[1]._id
					]
				},
				{
					name: 'Empty Zone'
				}
			];

			// return Zone.createAsync(zones);
			return Promise.resolve(Zone.create(zones));
		});

};

var seedCameras = function() {
	return Promise.all([
		Zone.findOne({name: 't1\'s Zone'}).exec(),
		Zone.findOne({name: 't2\'s Zone'}).exec(),
		Zone.findOne({name: 'Obama\'s Zone'}).exec(),
		Zone.findOne({name: 'Empty Zone'}).exec()
	]).then(function(zones){

		var cameras = [
			{
				name: 't1C1',
				zone: zones[0]
			},
			{
				name: 't2C1',
				zone: zones[1]
			},
			{
				name: 't1C2',
				zone: zones[0]
			}
		];
		// return Camera.createAsync(cameras);
		return Promise.resolve(Camera.create(cameras));
	});

};

connectToDb.then(function () {
	return Promise.resolve(User.find().exec())
    .then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function(users){
		return Zone.find().exec();
	}).then(function(zones){
		if (zones.length === 0) {
			return seedZones();
		} else {
			console.log(chalk.magenta('Seems to already be zone data, exiting!'));
			process.kill(0);
		}
	}).then(function(){
		return Camera.find().exec();
	}).then(function(cameras){
		if (cameras.length === 0) {
			return seedCameras();
		} else {
			console.log(chalk.magenta('Seems to already be camera data, exiting!'));
			process.kill(0);
		}
	})
	.then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
