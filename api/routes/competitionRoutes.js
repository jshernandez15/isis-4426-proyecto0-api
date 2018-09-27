'use strict';

var jwtTokenVerifier = require('./jwtTokenVerifier');

module.exports = function (app) {

	var competition = require('../controllers/competitionController');

	// competition Routes
	app.route('/competition')
		.get(jwtTokenVerifier, competition.list)
		.post(jwtTokenVerifier, competition.create);

	// competition Routes
	app.route('/competitionWithoutToken')
		.get(competition.list)

	app.route('/competition/:competitionId')
		.get(jwtTokenVerifier, competition.find)
		.put(jwtTokenVerifier, competition.update)
		.delete(jwtTokenVerifier, competition.delete);

	app.route('/competition/url/:url')
		.get(jwtTokenVerifier, competition.findByURL);
};