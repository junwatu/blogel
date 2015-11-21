'use babel'

'use strict'

import { defaultRoute, user, api, saveNewPost, listPosts, getPost, updatePost, deletePost, loginPage, signupPage, logout } from './routes'

const config = require('./config')

function isLoggedin (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = (pring, passport) => {
  config.get('passport:authentication') ? pring.get('/', defaultRoute) : pring.get('/', user)

  pring.get('/api', api)

  pring.post('/api/posts', saveNewPost)
  pring.get('/api/posts', listPosts)

  pring.get('/api/posts/:id', getPost)
  pring.put('/api/posts/:id', updatePost)
  pring.delete('/api/posts/:id', deletePost)

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
}
