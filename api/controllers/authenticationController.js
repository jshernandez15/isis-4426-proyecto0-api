var User = require('../models/user');

exports.create = function(req, res) {
    var user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    };
    User.create(req.getConnection, user, function(value){
        if (value)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
};

exports.login = function(req, res) {
    var user = {
        name: req.body.name,
        password: req.body.password
    };
    User.login(req.getConnection, user, function(token) {
        switch (token.status) {
            case "ERR":
                res.sendStatus(500);
                break;
            case "NOT_FOUND": 
                res.sendStatus(404);
                break;
            case "WRONG": 
                res.sendStatus(403);
                break;
            case "OK": 
                res.status(200).send({ auth: true, token: token.value });
                break;
            default:
                res.sendStatus(500);
        }
    });
}