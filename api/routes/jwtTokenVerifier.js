var jwt = require('jsonwebtoken');
var config = require('../config');

function jwtTokenVerifier(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.key, function(err, decoded) {
        if (err) 
            return res.status(403)
                    .send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.username = decoded.id;
        next();
    }); 
}

module.exports = jwtTokenVerifier;
