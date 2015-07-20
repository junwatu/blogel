/**
* Logger
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
var winston = require('winston');
var config = require('../config');
var root = require('../util').path();

exports.Logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)( {
            filename: root+config.get('logger:filename'),
            maxsize: 1048576,
            maxFiles: 5,
            handleExceptions: true
        }),
        new (winston.transports.Console)({level: 'error'})
    ]
});
