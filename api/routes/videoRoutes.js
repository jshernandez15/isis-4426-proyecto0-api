'use strict';

var jwtTokenVerifier = require('./jwtTokenVerifier');

module.exports = function (app) {

	var video = require('../controllers/videoController');

	// competition Routes
	app.route('/video')
		.post(jwtTokenVerifier, video.create);

	/*
	app.route('/competition/:competitionId')
		.get(jwtTokenVerifier, competition.find)
		.put(jwtTokenVerifier, competition.update)
		.delete(jwtTokenVerifier, competition.delete);
		*/
};