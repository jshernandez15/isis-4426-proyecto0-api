'use strict';
const upload = require('./../../api/controllers/uploadController');


module.exports = function (app) {

	app.post('/upload', upload);

};