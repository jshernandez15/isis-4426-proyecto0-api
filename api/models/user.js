'use strict'

function user(obj) {
    this.name = obj.name;
    this.password = obj.password;
}

exports.create = function(db, user, callback){
    db(function(err, connection) {
        if (err) throw "Error on db: " + err;
        connection.query('INSERT INTO Users SET ?', user, function (error, results, fields) {
            if (error){
                if (error.code != 'ER_DUP_ENTRY') throw error;
                else {
                    callback(false);
                }    
            }
            else{
                callback(results.insertId);
            }
        });
    });
};