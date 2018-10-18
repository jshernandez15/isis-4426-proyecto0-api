'use strict'

var AWS = require("aws-sdk");
var uuid = require('uuid');

exports.list = function (user, callback) {
    //order by created desc'
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



exports.create = function (competition, user, callback) {
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

exports.find = function (id, callback) {

    AWS.config.update({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon

    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "competitions",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id"
        },
        ExpressionAttributeValues: {
            ":id": id
        }
    };

    docClient.query(params, function (err, data) {
        if (err) {
            callback({ code: 500 });
        } else {
            callback({ competition: data.Items[0] });
        }
    });
}

exports.update = function (competition, id, callback) {
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
            "user": { "S": competition.suser }
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

exports.delete = function (id, callback) {
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