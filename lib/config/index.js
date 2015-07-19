/**
 *  Using file configuration based on NODE_ENV
 */
'use strict';
const nconf = require('nconf');
const root = require('../util');

function Config() {
    nconf.argv().env('_');
    let env = nconf.get('NODE_ENV' || 'development');
    nconf.file(env, root.path() + '/configuration/' + env + '.json');
    nconf.file('default', root.path() + '/configuration/development.json');
}

Config.prototype.get = (key) => {
    return nconf.get(key);
}

module.exports = new Config();
