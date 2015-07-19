/**
* User Model
* 
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
"use strict";

const db = require('../middleware/db');
const bcrypt = require('bcrypt-nodejs');
const sendto = require('../logger');
const Logger = require('../logger').Logger;
const util = require('util');

function User(user) {
    for (let key in user) {
        this[key] = user[key];
    }
};

User.findById = (id, fn) => {
    db.findOne({ _id: id }, (err, doc) => {
        if (err) return fn(err);
        return fn(null, doc);
    })
};

User.findOne = (param, fn) => {
    db.find(param, (err, user) => {
        if (err) return fn(err);
        if (user.length == 0) {
            return fn(null, null);
        } else {
            return fn(null, user);
        }
    });
};

User.hashPassword = (password, fn) => {
    User._salting((err, salt) => {
        if (err) return fn(err);
        User._hash(password, salt, (err, result) => {
            if (err) return fn(err);
            return fn(null, result);
        })
    })
};

User._hash = (password, salt, fn) => {
    bcrypt.hash(password, salt, null, (err, resultHash) => {
        if (err) return fn(err, null);
        return fn(null, resultHash);
    })
}

User._salting = (fn) => {
    bcrypt.genSalt(8, (err, saltResult) => {
        if (err) return fn(err);
        return fn(null, saltResult);
    });
}

User.validPassword = (password, user, fn) => {
    bcrypt.compare(password, user[0].localPassword, (err, result) => {
        if(err) return fn(err);
        return fn(null, result)
    })
};

User.prototype.save = (fn) => {
    let user = this;
    User.hashPassword(user.localPassword, (err, hashing) => {
        if (err) console.log(err);
        user["localPassword"] = hashing;
        console.log(util.inspect(user));
        db.insert(user, (err, newUser) => {
            if (err) return fn(err);
            return fn(null, newUser);
        });
    });
};

module.exports = User;
