'use strict';

var Event = require('../models/event');

exports.list = function(req, res) {
    Event.list(req.getConnection, req.username, function(store) {
        if (store.list)
            res.json(store.list);
        else
            res.sendStatus(store.code);
    });
};

exports.create = function(req, res) {
    Event.create(req.getConnection, req.body, req.username, function(insertedId) {
        if (insertedId) {
            res.status(201).send({id: insertedId, ...req.body});
        }
        else {
            res.status(400).send({message: "Error creating the event"});
        }
    });
  
};

exports.find = function(req, res) {
    Event.find(req.getConnection, req.params.eventId, function(store) {
        if (store.event)
            res.json(store.event);
        else
            res.sendStatus(store.code);
    });
};

exports.update = function(req, res) {
    Event.update(req.getConnection, req.body, req.params.eventId, function(store) {
        if (store.code == 200)
            res.status(200).send({id: req.params.eventId, ...req.body});
        else
            res.sendStatus(store.code);
    });
};

exports.delete = function(req, res) {
    Event.delete(req.getConnection, req.params.eventId, function(store) {
        res.status(store.code).send({});
    });
};


