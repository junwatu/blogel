'use babel'

'use strict'

import { defaultRoute, user, api, saveNewPost, listPosts, getPost, updatePost, deletePost, loginPage, signupPage, logout } from './routes'

const express = require('express')
const config = require('./config')
const engine = require('consolidate')
const root = require('./util')
const passport = require('passport')
const flash = require('connect-flash')
const Logger = require('./logger').Logger
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const pring = express()
const router = express.Router()

require('./middleware/auth/passport')(passport)

function isLoggedin (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

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

config.get('passport:authentication') ? pring.get('/', defaultRoute) : pring.get('/', user)

router.route('/').get(api)

router.route('/posts')
  .post(saveNewPost)
  .get(listPosts)

router.route('/posts/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost)

pring.post('/login', passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}))
pring.get('/login', loginPage)

pring.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/user',
  failureRedirect: '/signup',
  failureFlash: true
}))
pring.get('/signup', signupPage)

pring.get('/logout', logout)
pring.get('/user', isLoggedin, user)

pring.use('/api', router)

pring.listen(config.get('express:port'), () => console.log(`Blogel is running on port ${config.get('express:port')}`))

process.on('unhandledRejection', (err) => Logger.error(err.stack))

module.exports = { express, pring }
