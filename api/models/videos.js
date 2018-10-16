"use strict";

var AWS = require("aws-sdk");
var uuid = require('uuid');


exports.list = function (db, param, callback) {
  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    connection.query(
      "SELECT * FROM videos where fk_id_competition = ? and state_video = ? order by id_video desc",
      [param.competitionId, param.state],
      function (error, results, fields) {
        if (error) {
          console.log("Error performing select Competitions query: " + error);
          callback({ code: 500 });
        } else {
          callback({ list: results });
        }
      }
    );
  });
};

exports.listById = function (db, param, callback) {
  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    connection.query(
      "SELECT * FROM videos where fk_id_competition = ? order by id_video desc",
      [param.competitionId],
      function (error, results, fields) {
        if (error) {
          console.log("Error performing select Competitions query: " + error);
          callback({ code: 500 });
        } else {
          callback({ list: results });
        }
      }
    );
  });
};

exports.create = function (db, video, callback) {
  AWS.config.update({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.SECRETKEYID
  });
  AWS.config.region = "us-west-2"; //us-west-2 is Oregon

  console.log(process.env.KEYID);
  console.log(process.env.SECRETKEYID);
  var ddb = new AWS.DynamoDB();

  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    var d = new Date();
    var dateCreated =
      "" +
      d.getFullYear() +
      "-" +
      d.getMonth() +
      "-" +
      d.getDay() +
      " " +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds();
    var newVideo = {};
    newVideo.id = uuid.v1();
    newVideo.name = video.name;
    newVideo.last_name = video.lastName;
    newVideo.email = video.email
    newVideo.path_real = video.path;
    newVideo.description = video.description;
    newVideo.fk_id_competition = Number(video.idConcurso);
    newVideo.path_convertido = "";
    newVideo.state_video = video.stateVideo;


    var params = {
      TableName: 'videos',
      Item: {
        "id": { "S": video.name },
        "name": { "S": video.name },
        "last_name": { "S": video.lastName },
        "email": { "S": video.email },
        "path_real": { "S": video.path },
        "description": { "S": video.description },
        "fk_id_competition": { N: video.idConcurso.toString() },
        "path_convertido": { "S": "empty" },
        "state_video": { "S": video.stateVideo }
      }
    };

    console.log("++++++++++++++++++++++");
    console.log(params);
    console.log("++++++++++++++++++++++");
    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });

    connection.query(
      "INSERT INTO videos SET ?",
      { ...newVideo, created: dateCreated },
      function (error, results, fields) {
        if (error) {
          console.log("Error performing insert videos query: " + error);
          callback(false);
        } else {
          callback(results.insertId);
        }
      }
    );
  });
};

exports.find = function (db, id, callback) {
  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    connection.query(
      "SELECT * FROM videos where fk_id_competition = ? order by id_video desc",
      [id],
      function (error, results, fields) {
        if (error) {
          console.log(
            "Error performing select Competitions by id query: " + error
          );
          callback({ code: 500 });
        } else {
          if (results.length == 0) callback({ code: 404 });
          else callback({ competition: results[0] });
        }
      }
    );
  });
};

exports.update = function (db, competition, id, callback) {
  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    delete competition.created;
    connection.query(
      "update Competitions set ? where id = ?",
      [competition, id],
      function (error, results, fields) {
        if (error) {
          console.log(
            "Error performing update Competitions by id query: " + error
          );
          callback({ code: 500 });
        } else {
          if (results.affectedRows == 0) callback({ code: 404 });
          else callback({ code: 200 });
        }
      }
    );
  });
};

exports.delete = function (db, id, callback) {
  db(function (err, connection) {
    if (err) throw "Error on db: " + err;
    connection.query("delete from Competitions where id = ?", [id], function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(
          "Error performing delete Competitions by id query: " + error
        );
        callback({ code: 500 });
      } else {
        if (results.affectedRows == 0) callback({ code: 404 });
        else callback({ code: 200 });
      }
    });
  });
};
