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
            email: 'testing@fsa.com',
            password: 'password',
			plates: [
				'YGA91B',
				'ABCD12'
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
		User.findOne({email: 'testing@nsa.com'}).exec(),
		User.findOne({email: 'obama@gmail.com'}).exec()
		]).then(function(users){

			var zones = [
				{
					name: 'Obama\'s Zone',
					users: [
						users[0]._id
					]
				},
				{
					name: 'testingFSA\'s Zone',
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
		Zone.findOne({name: 'Obama\'s Zone'}).exec(),
		Zone.findOne({name: 'testingFSA\'s Zone'}).exec()
	]).then(function(zones){

		var cameras = [
			{
				zone: zones[0]
			},
			{
				zone: zones[1]
			},
			{
				zone: zones[0]
			}
		];
		// return Camera.createAsync(cameras);
		return Promise.resolve(Camera.create(cameras));
	});

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
