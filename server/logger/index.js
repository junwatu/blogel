'use strict'

const config = require('../config')
const root = require('../util').path()
const bunyan = require('bunyan')

exports.Logger = bunyan.createLogger({
  name: 'blogel',
  streams: [
    {
      stream: process.stdout
    },
    {
      level: 'error',
      path: root + config.get('logger:filename')
    }]
})
