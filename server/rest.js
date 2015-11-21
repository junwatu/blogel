'use strict'

const routes = require('./routes')
const config = require('./config')

function isLoggedin (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = (pring, passport) => {
  if (config.get('passport:authentication')) {
    pring.get('/', routes.default)
  } else {
    pring.get('/', routes.user)
  }
  pring.get('/api', routes.api)
  pring.post('/api/posts', routes.savePost)
  pring.get('/api/posts', routes.listPosts)
  pring.get('/api/posts/:id', routes.getPost)
  pring.put('/api/posts/:id', routes.updatePost)
  pring.delete('/api/posts/:id', routes.deletePost)
  pring.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
  }))

  pring.get('/login', routes.loginPage)
  pring.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user',
    failureRedirect: '/signup',
    failureFlash: true
  }))
  pring.get('/signup', routes.signupPage)
  pring.get('/logout', routes.logout)
  pring.get('/user', isLoggedin, routes.user)
}
