/**
* Utility
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/

var path = require('path');

exports.path = function () {
    return path.normalize(__dirname + '../..');
}