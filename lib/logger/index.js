/**
* Logger
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
var winston = require('winston'),
    config = require('../config'),
    root = require('../util');

exports.Logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)( {
        filename: root.path()+config.get('logger:filename'),
        maxsize: 1048576,
        maxFiles: 5,
        handleExceptions: true
        }),
        new (winston.transports.Console)({level: 'error'})
    ]
});