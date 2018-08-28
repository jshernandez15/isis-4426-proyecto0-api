'use strict'

exports.list = function (db, id, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM videos where fk_id_competition = ?', [id], function (error, results, fields) {
            if (error) {
                console.log('Error performing select Competitions query: ' + error);
                callback({ code: 500 });
            }
            else {
                callback({ list: results });
            }
        });
    });
}

exports.create = function (db, video, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        var d = new Date();
        var dateCreated = "" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
        console.log(JSON.stringify(video));
        var newVideo = {};
        newVideo.name = video.name;
        newVideo.last_name = video.lastName;
        newVideo.email = video.email;
        newVideo.path_real = video.path;
        newVideo.description = video.description;
        newVideo.fk_id_competition = video.idConcurso;
        newVideo.path_convertido = "";
        newVideo.state_video = video.stateVideo;
        console.log(JSON.stringify(newVideo));

        connection.query('INSERT INTO videos SET ?', { ...newVideo, created: dateCreated }, function (error, results, fields) {
            if (error) {
                console.log('Error performing insert videos query: ' + error);
                callback(false);
            }
            else {
                console.log(results);
                callback(results.insertId);
            }
        });
    });
}

exports.find = function (db, id, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM videos where fk_id_competition = ?', [id], function (error, results, fields) {
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

exports.update = function (db, competition, id, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        delete competition.created;
        connection.query("update Competitions set ? where id = ?",
            [competition, id], function (error, results, fields) {
                if (error) {
                    console.log('Error performing update Competitions by id query: ' + error);
                    callback({ code: 500 });
                }
                else {
                    if (results.affectedRows == 0)
                        callback({ code: 404 });
                    else
                        callback({ code: 200 });
                }
            });
    });
}

exports.delete = function (db, id, callback) {
    db(function (err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('delete from Competitions where id = ?', [id], function (error, results, fields) {
            if (error) {
                console.log('Error performing delete Competitions by id query: ' + error);
                callback({ code: 500 });
            }
            else {
                if (results.affectedRows == 0)
                    callback({ code: 404 });
                else
                    callback({ code: 200 });
            }
        });
    });
}