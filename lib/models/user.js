/**
* User Model
* 
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
"use strict";

var db = require('../middleware/db');
var bcrypt = require('bcrypt-nodejs');
var sendto = require('../logger');
var Logger = require('../logger').Logger;
var util = require('util');

function User(user) {
    for (var key in user) {
        this[key] = user[key];
    }
};

User.findById = function(id, fn) {
    db.findOne({
        _id: id
    }, function(err, doc) {
        if (err) return fn(err);
        return fn(null, doc);
    })
};

User.findOne = function(param, fn) {
    db.find(param, function(err, user) {

        if (err) return fn(err);

        if (user.length == 0) {
            return fn(null, null);

        } else {
            return fn(null, user);
        }
    });
};

User.hashPassword = function(password, fn) {
    User._salting(function(err, salt) {
        if (err) return fn(err);

        User._hash(password, salt, function(err, result) {
            if (err) return fn(err);

            return fn(null, result);
        })
    })
};

User._hash = function(password, salt, fn) {

    bcrypt.hash(password, salt, null, function(err, resultHash) {
        if (err) return fn(err, null);
        return fn(null, resultHash);
    })
}

User._salting = function(fn) {
    bcrypt.genSalt(8, function(err, saltResult) {
        if (err) return fn(err);
        return fn(null, saltResult);
    });
}

User.validPassword = function(password, user, fn) {

    bcrypt.compare(password, user[0].localPassword, function(err, result){
        if(err) return fn(err);
        return fn(null, result)
    })
};

User.prototype.save = function(fn) {

    var user = this;

    User.hashPassword(user.localPassword, function(err, hashing) {
        if (err) console.log(err);

        user["localPassword"] = hashing;

        console.log(util.inspect(user));

        db.insert(user, function(err, newUser) {
            if (err) return fn(err);

            return fn(null, newUser);
        });
    });
};

module.exports = User;
