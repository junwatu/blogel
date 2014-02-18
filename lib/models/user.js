/**++++++++++++++++++
*  User Model
* +++++++++++++++++++
*
*
The MIT License (MIT)

Copyright (c) 2014 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
"use strict";

var db = require('../middleware/db'),
    bcrypt = require('bcrypt-nodejs'),
    sendto = require('../logger'),
    Logger = require('../logger').Logger,
    util = require('util');

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
