/**
* Utility
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
var path = require('path');

exports.path = () => {
    return path.normalize(__dirname + '../..');
}