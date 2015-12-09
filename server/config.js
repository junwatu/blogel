/* @flow */
'use strict'

import { rootPath } from './util'
import nconf from 'nconf'

let root = rootPath()

export default class Config {
  constructor () { 
    nconf.argv().env('_')
    let env = nconf.get('NODE_ENV')
    if (env) {
      nconf.file(env, `${root}/configuration/${env}.json`)	
    } else {
      nconf.file('default', `${root}/configuration/development.json`)	
    }
  }
  
  get (key) {
  	return nconf.get(key)
  }
}