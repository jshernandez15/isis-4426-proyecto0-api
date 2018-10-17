'use strict'

var AWS = require("aws-sdk");
var uuid = require('uuid');

exports.list = function (db, user, callback) {
    //order by created desc'
    console.log(user);
    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon

    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "competitions",
        FilterExpression: "#user = :user",
        ExpressionAttributeNames: {
            "#user": "user",
        },
        ExpressionAttributeValues: { ":user": user }

    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            callback({ list: data.Items });
        }
    });
};



exports.create = function (db, competition, user, callback) {
    //validar tema URL
    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon
    var ddb = new AWS.DynamoDB();
    var d = new Date();
    var dateCreated = "" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();

    var params = {
        TableName: 'competitions',
        Item: {
            "id": { "S": uuid.v1() },
            "name": { "S": competition.name },
            "created": { "S": dateCreated },
            "banner": { "S": competition.banner },
            "address": { "S": competition.address },
            "init": { "S": competition.init },
            "end": { "S": competition.end },
            "prize": { "S": competition.prize },
            "user": { "S": user }
        }
    };

    ddb.putItem(params, function (err, data) {
        if (err) {
            callback({ code: 500 });
        } else {
            callback(0);
        }
    });

}

exports.find = function (db, id, callback) {

    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Competitions where id = ?', [id], function (error, results, fields) {
            if (error) {
                console.log('Error performing select Competitions by id query: ' + error);
                callback({ code: 500 });
            }
            else {
                if (results.length == 0)
                    callback({ code: 404 });
                else
                    callback({ competition: results[0] });
            }
        });
    });
}

exports.findByURL = function (db, address, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Competitions where address = ?', [address], function (error, results, fields) {
            if (error) {
                console.log('Error performing select Competitions by address query: ' + error);
                callback({ code: 500 });
            }
            else {
                if (results.length == 0)
                    callback({ code: 404 });
                else
                    callback({ competition: results[0] });
            }
        });
    });
}

exports.update = function (db, competition, id, callback) {
    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon
    var ddb = new AWS.DynamoDB();
    var d = new Date();
    var dateCreated = "" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();

    var params = {
        TableName: 'competitions',
        Item: {
            "id": { "S": id },
            "name": { "S": competition.name },
            "created": { "S": dateCreated },
            "banner": { "S": competition.banner },
            "address": { "S": competition.address },
            "init": { "S": competition.init },
            "end": { "S": competition.end },
            "prize": { "S": competition.prize },
            "user": { "S": competition.user }
        }
    };

    ddb.putItem(params, function (err, data) {
        if (err) {
            callback({ code: 500 });
        } else {
            callback({ code: 200 });
        }
    });
}

exports.delete = function (db, id, callback) {
    //Borrar cascada videos

    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon

    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "competitions",
        Key: {
            "id": id
        }
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            callback({ code: 500 });
        } else {
            callback({ code: 200 });
        }
    });

}