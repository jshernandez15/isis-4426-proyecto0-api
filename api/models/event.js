'use strict'

function event(obj) {
    this._id = obj._id;
    this.name = obj.name;
}

module.exports = event;