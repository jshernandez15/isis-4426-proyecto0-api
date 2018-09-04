'use strict';

var Videos = require('../models/videos');

exports.list = function(req, res) {
    Videos.list(req.getConnection, req.username, function(store) {
        if (store.list)
            res.json(store.list);
        else
            res.sendStatus(store.code);
    });
};

exports.create = function(req, res) {
    Videos.create(req.getConnection, req.body, function(insertedId) {
        if (insertedId) {
            res.status(201).send({...req.body, id: insertedId});
        }
        else {
            res.status(400).send({message: "Error creating the competition"});
        }
    });
  
};

exports.find = function(req, res) {
    Videos.find(req.getConnection, req.params.competitionId, function(store) {
        if (store.competition)
            res.json(store.competition);
        else
            res.sendStatus(store.code);
    });
};

exports.update = function(req, res) {
    Videos.update(req.getConnection, req.body, req.params.competitionId, function(store) {
        if (store.code == 200)
            res.status(200).send({id: req.params.competitionId, ...req.body});
        else
            res.sendStatus(store.code);
    });
};

exports.delete = function(req, res) {
    Videos.delete(req.getConnection, req.params.competitionId, function(store) {
        res.status(store.code).send({});
    });
};


