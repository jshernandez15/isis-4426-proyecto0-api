'use strict';

var Event = require('../models/event');

let eventList = [];

exports.list = function(req, res) {
    res.json(eventList);
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
    for (let index = 0; index < eventList.length; index++) {
        const element = eventList[index];
        if(element._id == req.params.eventId)
            res.json(element);
    }
    if( !res.headersSent )
        res.sendStatus(404);
};

exports.update = function(req, res) {
    for (let index = 0; index < eventList.length; index++) {
        if(eventList[index]._id === req.params.eventId) {
            eventList[index] = new Event(req.body);
            res.json(eventList[index]);
        }
    }
    if( !res.headersSent )
        res.sendStatus(404);
};

exports.delete = function(req, res) {
    eventList = eventList.filter( e => e._id != req.params.eventId );
    res.sendStatus(200);
};


