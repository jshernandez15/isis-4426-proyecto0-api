'use strict'

exports.list = function(db, callback) {
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('SELECT * FROM Events', [], function (error, results, fields) {
            if (error){
                console.log('Error performing select events query: ' + error);
                callback(500);
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