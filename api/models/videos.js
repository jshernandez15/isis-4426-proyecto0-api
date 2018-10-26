"use strict";

var AWS = require("aws-sdk");
var uuid = require("uuid");
var Producer = require("sqs-producer");

var SESCREDENTIALS = {
  accessKeyId: process.env.KEYID || "",
  secretAccessKey: process.env.SECRETKEYID || ""
};

var producer = Producer.create({
  queueUrl: "https://sqs.us-west-2.amazonaws.com/994147617895/sqsGrupo1",
  region: "us-west-2",
  accessKeyId: SESCREDENTIALS.accessKeyId,
  secretAccessKey: SESCREDENTIALS.secretAccessKey
});

exports.list = function(param, callback) {
  //order by id_video desc
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "videos",
    FilterExpression:
      "#fk_id_competition = :fk_id_competition and #state_video = :state_video",
    ExpressionAttributeNames: {
      "#fk_id_competition": "fk_id_competition",
      "#state_video": "state_video"
    },
    ExpressionAttributeValues: {
      ":fk_id_competition": param.competitionId,
      ":state_video": param.state
    }
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      callback({ code: 500 });
    } else {
      callback({ list: data.Items });
    }
  });
};

exports.listById = function(param, callback) {
  //order by id_video desc
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "videos",
    FilterExpression: "#fk_id_competition = :fk_id_competition",
    ExpressionAttributeNames: {
      "#fk_id_competition": "fk_id_competition"
    },
    ExpressionAttributeValues: { ":fk_id_competition": param.competitionId }
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      callback({ code: 500 });
    } else {
      callback({ list: data.Items });
    }
  });
};

exports.create = function(video, callback) {
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  var ddb = new AWS.DynamoDB();
  var id = uuid.v1();

  var params = {
    TableName: "videos",
    Item: {
      id: { S: id },
      name: { S: video.name },
      last_name: { S: video.lastName },
      email: { S: video.email },
      path_real: { S: video.path },
      description: { S: video.description },
      fk_id_competition: { S: video.idConcurso.toString() },
      path_convertido: { S: "empty" },
      state_video: { S: video.stateVideo },
      dateCreated: { S: new Date().toDateString() }
    }
  };


  video.id = id;

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(false);
    } else {
      producer.send(
        [
          {
            id: uuid.v1(),
            body: JSON.stringify(video)
          }
        ],
        function(err) {
          if (err) console.log(err);
        }
      );
      console.log("Success", data);
      callback(data);
    }
  });
};

exports.find = function(id, callback) {
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "videos",
    FilterExpression: "#fk_id_competition = :fk_id_competition",
    ExpressionAttributeNames: {
      "#fk_id_competition": "fk_id_competition"
    },
    ExpressionAttributeValues: { ":fk_id_competition": id }
  };

  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      callback({ code: 500 });
    } else {
      callback({ competition: data.Items[0] });
    }
  });
};

exports.update = function(competition, id, callback) {
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  var ddb = new AWS.DynamoDB();

  var params = {
    TableName: "videos",
    Item: {
      id: { S: uuid.v1() },
      name: { S: video.name },
      last_name: { S: video.lastName },
      email: { S: video.email },
      path_real: { S: video.path },
      description: { S: video.description },
      fk_id_competition: { N: video.idConcurso.toString() },
      path_convertido: { S: "empty" },
      state_video: { S: video.stateVideo },
      dateCreated: { S: new Date().toString() }
    }
  };

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback({ code: 500 });
    } else {
      console.log("Success", data);
      callback({ code: 200 });
    }
  });
};

exports.delete = function(id, callback) {
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: "videos",
    Key: {
      id: id
    }
  };

  docClient.delete(params, function(err, data) {
    if (err) {
      callback({ code: 500 });
    } else {
      callback({ code: 200 });
    }
  });
};
