'use strict';

var jwtTokenVerifier = require('./jwtTokenVerifier');

module.exports = function(app) {
	
	var event = require('../controllers/eventController');
	
	// event Routes
	app.route('/event')
		.get(jwtTokenVerifier, event.list)
		.post(jwtTokenVerifier, event.create);
	
	
	app.route('/event/:eventId')
		.get(jwtTokenVerifier, event.find)
		.put(jwtTokenVerifier, event.update)
		.delete(jwtTokenVerifier, event.delete);
};