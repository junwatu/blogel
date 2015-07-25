'use babel';
/**
* Pring App Server
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
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
pring.use(express.static(`${root.path()}/public`));
pring.set('views', `${root.path()}/views`);
pring.engine('html', engine.handlebars);
pring.set('view engine', 'html');

rest(pring, passport);

pring.listen(config.get('express:port'), () => {
    let msg = `Blogel is running on port ${config.get('express:port')}`;
    console.log(msg);
    Logger.info(msg);
});

process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
});

module.exports = pring;