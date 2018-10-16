'use strict'

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var AWS = require("aws-sdk");
var uuid = require('uuid');

exports.create = function (db, user, callback) {
    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon
    var ddb = new AWS.DynamoDB();

    var params = {
        TableName: 'users',
        Item: {
            "email": { "S": user.name },
            "password": { "S": user.password },
            "firstName": { "S": user.firstName },
            "lastName": { "S": user.lastName }
        }
    };


    ddb.putItem(params, function (err, data) {
        if (err) {
            callback("Error", err);
        } else {
            callback("Success", params);
        }
    });

};

exports.login = function (db, user, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Users WHERE name = ?', [user.name], function (error, results, fields) {
            if (error) {
                console.log('Error performing insert user query: ' + error);
                callback({ status: "ERR" });
            }
            else {
                if (results.length == 0) callback({ status: "NOT_FOUND" });
                else {
                    let dbUser = results[0];
                    var passwordIsValid = bcrypt.compareSync(user.password, dbUser.password);
                    if (!passwordIsValid) callback({ status: "WRONG" });
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