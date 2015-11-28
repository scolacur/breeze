// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./user');
require('./zone');
require('./camera');


/*
Organization:

Zones = complexes, communities, single houses, anything that has
one or more cameras

Each zone has a list of users

Each camera knows which zone its a part of

When a camera takes a picture, it sends the Number
along with its id to the server

Server checks camera.zone, gets the zone

checks zone.users

checks each of those users plates, compares to the number
*/
