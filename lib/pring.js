/**++++++++++++++++++
*  Pring App Server
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

"use strict";

var express = require('express'),
    pring = express(),
    config = require('./config'),
    routes = require('./routes'),
    app = require('../package.json'),
    engine = require('consolidate'),
    root = require('./util');

pring.configure(function() {

    pring.use(express.logger());
    pring.use(express.bodyParser());
    pring.use(express.methodOverride());

    pring.use(express.static(root.path() + '/public'));

    pring.set('views', root.path() + '/views');
    pring.engine('html', engine.handlebars);
    pring.set('view engine', 'html');
});

pring.get('/', routes.default);

pring.get('/api', routes.api);

pring.post('/api/posts', routes.savePost);

pring.get('/api/posts', routes.listPosts);

pring.get('/api/posts/:id', routes.getPost);

pring.put('/api/posts/:id', routes.updatePost);

pring.delete('/api/posts/:id', routes.deletePost);

pring.post('/login', routes.login);
pring.get('/login', routes.loginPage);

pring.post('/signup', routes.signup);
pring.get('/signup', routes.signupPage);

pring.post('/logout', routes.logout);

pring.listen(config.get('express:port'), function() {
    console.log('Pagedek is running on port ' + config.get('express:port'));
});

module.exports = pring;
