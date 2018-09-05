'use strict';


module.exports = function (app) {

	var video = require('../controllers/videoController');

	// videos Routes
	app.route('/video')
		.post(video.create);

	app.route('/video/:competitionId')
		.get(video.find)
};