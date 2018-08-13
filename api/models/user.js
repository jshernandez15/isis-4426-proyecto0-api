'use strict'

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.create = function(db, user, callback){
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('INSERT INTO Users SET ?', user, function (error, results, fields) {
            if (error){
                console.log('Error performing insert user query: ' + error);
                callback(false);
            }
            else{
                callback(results.insertId);
            }
        });
    });
};

exports.login = function(db, user, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Users WHERE name = ?', [user.name], function (error, results, fields) {
            if (error){
                console.log('Error performing insert user query: ' + error);
                callback({status: "ERR"});
            }
            else {
                if(results.length == 0) callback({status: "NOT_FOUND"});
                else {
                    let dbUser = results[0];
                    var passwordIsValid = bcrypt.compareSync(user.password, dbUser.password);
                    if (!passwordIsValid) callback({status: "WRONG"});
                    else callback({
                        status: "OK",
                        value: jwt.sign({ id: user.name }, config.key, {
                            expiresIn: 86400
                        })
                    });
                }
            }
        });
    });
}