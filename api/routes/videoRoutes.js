'use strict';

var jwtTokenVerifier = require('./jwtTokenVerifier');

module.exports = function (app) {

	var video = require('../controllers/videoController');

	// competition Routes
	app.route('/video')
		.post(jwtTokenVerifier, video.create);

	app.route('/video/:competitionId')
		.get(video.find)
		.put(jwtTokenVerifier, video.update)
		.delete(jwtTokenVerifier, video.delete);
};