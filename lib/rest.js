/**++++++++++++++++++
*  REST API
* +++++++++++++++++++
*
*
The MIT License (MIT)

Copyright (c) 2014 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
'use strict';
var routes = require('./routes');
var config = require('./config');

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/');    
}

module.exports = function(pring, passport) {
    if(config.get('passport:authentication')){
       pring.get('/', routes.default); 
    } else {
       pring.get('/', routes.user);
    }
    pring.get('/api', routes.api);
    pring.post('/api/posts', routes.savePost);
    pring.get('/api/posts', routes.listPosts);
    pring.get('/api/posts/:id', routes.getPost);
    pring.put('/api/posts/:id', routes.updatePost);
    pring.delete('/api/posts/:id', routes.deletePost);
    pring.post('/login', passport.authenticate('local-login', {
        successRedirect : '/user',
        failureRedirect : '/login',
        failureFlash : true
    }));
    pring.get('/login', routes.loginPage);
    pring.post('/signup', passport.authenticate('local-signup', {
    	successRedirect : '/user',
		failureRedirect : '/signup',
		failureFlash : true 
    }));
    pring.get('/signup', routes.signupPage);
    pring.get('/logout', routes.logout);
    pring.get('/user', isLoggedin, routes.user);
}