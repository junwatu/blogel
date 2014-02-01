/**
 *  Using file configuration based on NODE_ENV
 */

var nconf = require('nconf'),
    root = require('../util'),
    env;

function Config() {
    nconf.argv().env('_');
    env = nconf.get('NODE_ENV' || 'development');
    nconf.file(env, root.path() + '/configuration/' + env + '.json');

    //default to development environment
    nconf.file('default', root.path() + '/configuration/development.json');
}

Config.prototype.get = function(key) {
    return nconf.get(key);
}

module.exports = new Config();
