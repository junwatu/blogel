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

var express = require('express');
var pring = express();
var config = require('./config');
var app = require('../package.json');
var engine = require('consolidate');
var root = require('./util');
var passport= require('passport');
var flash = require('connect-flash');
var rest = require('./rest');
var Logger = require('./logger').Logger;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');

require('./middleware/auth/passport')(passport);

pring.use(bodyParser.urlencoded({extended: true}));
pring.use(bodyParser.json());
pring.use(cookieParser()); 
pring.use(methodOverride());

pring.use(session({
	secret:'pagedekisasimplestaticgenerator', 
	resave: true,
	saveUninitialized: true
}));

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
    var msg = 'Blogel is running on port ' + config.get('express:port');
    console.log(msg);
    Logger.info(msg);
}

module.exports = pring;
