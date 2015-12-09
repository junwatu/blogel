'use strict'

import bunyan from 'bunyan'
import { rootPath } from '../util'
import Config from '../config'

const root = rootPath()

let config = new Config()

export function Logger () {
  return bunyan.createLogger({
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
}
