'use strict'

exports.list = function(db, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Events', [], function (error, results, fields) {
            if (error){
                console.log('Error performing select events query: ' + error);
                callback({code: 500});
            }
            else {
                callback({list: results});
            }
        });
    });
}

exports.create = function(db, event, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('INSERT INTO Events SET ?', event, function (error, results, fields) {
            if (error){
                console.log('Error performing insert event query: ' + error);
                callback(false);
            }
            else{
                callback(results.insertId);
            }
        });
    });
}

exports.find = function(db, id, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Events where id = ?', [id], function (error, results, fields) {
            if (error){
                console.log('Error performing select events by id query: ' + error);
                callback({code: 500});
            }
            else {
                if (results.length == 0)
                    callback({code: 404});
                else
                    callback({event: results[0]});
            }
        });
    });
}

exports.update = function(db, event, id, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query("update Events set ? where id = ?",
                        [event, id], function (error, results, fields) {
            if (error){
                console.log('Error performing update events by id query: ' + error);
                callback({code: 500});
            }
            else {
                if (results.affectedRows == 0)
                    callback({code: 404});
                else
                    callback({code: 200});
            }
        });
    });
}

exports.delete = function(db, id, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('delete from Events where id = ?', [id], function (error, results, fields) {
            if (error){
                console.log('Error performing delete events by id query: ' + error);
                callback({code: 500});
            }
            else {
                if (results.affectedRows == 0)
                    callback({code: 404});
                else
                    callback({code: 200});
            }
        });
    });
}