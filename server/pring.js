'use babel'

'use strict'

const express = require('express')
const pring = express()
const config = require('./config')
const app = require('../package.json')
const engine = require('consolidate')
const root = require('./util')
const passport = require('passport')
const flash = require('connect-flash')
const rest = require('./rest')
const Logger = require('./logger').Logger
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')

require('./middleware/auth/passport')(passport)

pring.use(bodyParser.urlencoded({extended: true}))
pring.use(bodyParser.json())
pring.use(cookieParser())
pring.use(methodOverride())

pring.use(session({
  secret: 'pagedekisasimplestaticgenerator',
  resave: true,
  saveUninitialized: true
}))

pring.use(passport.initialize())
pring.use(passport.session())
pring.use(flash())
pring.use(express.static(`${root.path()}/public`))
pring.set('views', `${root.path()}/views`)
pring.engine('html', engine.handlebars)
pring.set('view engine', 'html')

rest(pring, passport)

pring.listen(config.get('express:port'), () => {
  let msg = `Blogel is running on port ${config.get('express:port')}`
  console.log(msg)
  Logger.info(msg)
})

process.on('unhandledRejection', function (err, p) {
  Logger.error(err.stack)
})

module.exports = pring
