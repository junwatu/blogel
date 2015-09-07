'use strict';
var path = require('path');

exports.path = () => {
    return path.normalize(__dirname + '../..');
}
