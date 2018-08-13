'use strict';

module.exports = function(app) {

    var authentication = require('../controllers/authenticationController');

    app.route('/user')
        .post(authentication.create);
    
    app.route('/login')
        .post(authentication.login);

    app.route('/logout')
        .get(authentication.logout);
};