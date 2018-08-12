'use strict';

module.exports = function(app) {
	
	var event = require('../controllers/eventController');
	
	// event Routes
	app.route('/event')
		.get(event.list)
		.post(event.create);
	
	
	app.route('/event/:eventId')
		.get(event.find)
		.put(event.update)
		.delete(event.delete);
};