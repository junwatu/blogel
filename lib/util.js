var path = require('path');

exports.path = function () {
    return path.normalize(__dirname + '../..');
}