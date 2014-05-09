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
    app = require('../package.json'),
    engine = require('consolidate'),
    root = require('./util'),
    passport= require('passport'),
    flash = require('connect-flash'),
    rest = require('./rest'),
    Logger = require('./logger').Logger,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

require('./middleware/auth/passport')(passport);

pring.use(bodyParser());
pring.use(cookieParser()); 
pring.use(methodOverride());

pring.use(session({secret:'pagedekisasimplestaticgenerator'}));
pring.use(passport.initialize());
pring.use(passport.session());
pring.use(flash());

pring.use(express.static(root.path() + '/public'));

pring.set('views', root.path() + '/views');
pring.engine('html', engine.handlebars);
pring.set('view engine', 'html');

rest(pring, passport);

pring.listen(config.get('express:port'), pringLog);

function pringLog(){
    var msg = 'Pagedek is running on port ' + config.get('express:port');
    console.log(msg);
    Logger.info(msg);
}

module.exports = pring;
