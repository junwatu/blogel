'use strict'

const winston = require('winston')
const config = require('../config')
const root = require('../util').path()

exports.Logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: root + config.get('logger:filename'),
      maxsize: 1048576,
      maxFiles: 5,
      handleExceptions: true
    }),
    new (winston.transports.Console)({level: 'error'})
  ]
})
