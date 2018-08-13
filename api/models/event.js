'use strict'

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