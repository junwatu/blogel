'use strict'

import express from 'express'
import engine from 'consolidate'
import passport from 'passport'
import flash from 'connect-flash'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import favicon from 'express-favicon'

import * as r from './routes'
import Api from './routes/api'
import Config from './config'
import { init } from './db'
import { rootPath } from './util'
import { Logger } from './logger'

const pring = express()
const routerAPI = express.Router()
const root = rootPath()
const Log = Logger()

let blogelApp = new Api()
let config = new Config()

init()

require('./middleware/auth/passport')(passport)

function isLoggedin (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

pring.use(bodyParser.urlencoded({ extended: true }))
pring.use(bodyParser.json())
pring.use(cookieParser())
pring.use(methodOverride())
pring.use(favicon(`${root}/public/favicon.ico`))

pring.use(session({
  secret: 'pagedekisasimplestaticgenerator',
  resave: true,
  saveUninitialized: true
}))

pring.use(passport.initialize())
pring.use(passport.session())
pring.use(flash())
pring.use(express.static(`${root}/public`))
pring.set('views', `${root}/views`)
pring.engine('html', engine.handlebars)
pring.set('view engine', 'html')

config.get('passport:authentication') ? pring.get('/', r.defaultRoute) : pring.get('/', r.user)

routerAPI.route('/').get(blogelApp.info)

routerAPI.route('/posts')
  .post(blogelApp.savePostAPI)
  .get(r.listPostsAPI)
routerAPI.route('/posts/:id')
  .get(r.getPostAPI)
  .put(blogelApp.updatePostAPI)
  .delete(r.deletePostAPI)

pring.get('/posts/new', r.newPost)
pring.use('/api', routerAPI)

pring.get('/posts/:id', r.getPostView)

pring.post('/login', passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}))
pring.get('/login', r.loginPage)

pring.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/user',
  failureRedirect: '/signup',
  failureFlash: true
}))
pring.get('/signup', r.signupPage)

pring.get('/logout', r.logout)
pring.get('/user', isLoggedin, r.user)

pring.listen(config.get('express:port'), () => Log.info(`Blogel is running on port ${config.get('express:port')}`))

process.on('unhandledRejection', (err) => Log.error(err.stack))

module.exports = { express, pring }
