var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var User = require('../models/user');

let userList = [];

exports.create = function(req, res) {
    var user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    var newUser = new User(user);
    userList.push(newUser);
    res.sendStatus(201);
};

exports.login = function(req, res) {
    userList.forEach(user => {
        if(user.name == req.body.name ) {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            var token = jwt.sign({ id: user.name }, config.key, {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });
        }  
    });
    if( !res.headersSent )
        res.sendStatus(404);
}