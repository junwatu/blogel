'use babel';

'use strict';
var nconf = require('nconf');
var root = require('../util').path();

function Config() {
    nconf.argv().env('_');
    var env = nconf.get('NODE_ENV' || 'development');

    nconf.file(env, `${root}/configuration/${env}.json`);
    nconf.file('default', `${root}/configuration/development.json`);
}

Config.prototype.get = (key) => {
    return nconf.get(key);
}

module.exports = new Config();
