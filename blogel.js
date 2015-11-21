'use strict'

const TEMP_DIR = './tmp'
const SERVER_DIR = './server'

if (process.argv.length > 1) {
  if (process.argv.indexOf('--use-babel') !== -1) {
    module.exports = require(`${TEMP_DIR}/pring`)
  } else {
    module.exports = require(`${SERVER_DIR}/pring`)
  }
}
