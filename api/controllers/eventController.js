'use strict';

var Event = require('../models/event');

let eventList = [];

exports.list = function(req, res) {
    Event.list(req.getConnection, function(store) {
        if (store.list)
            res.json(store.list);
        else
            res.sendStatus(store.code);
    });
};

exports.create = function(req, res) {
    Event.create(req.getConnection, req.body, function(insertedId) {
        if (insertedId) {
            res.sendStatus(201);
        }
        else {
            res.sendStatus(400);
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
        if (store.event)
            res.json(store.event);
        else
            res.sendStatus(store.code);
    });
};

exports.delete = function(req, res) {
    Event.delete(req.getConnection, req.params.eventId, function(store) {
        res.sendStatus(store.code);
    });
};


