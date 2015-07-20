'use babel';
/**
* NeDB Database
*  
* The MIT License (MIT)
* Copyright (c) 2015 Equan Pr.
*/
'use strict';
var Datastore = require('nedb');
var root = require('../util').path();

var db = new Datastore({
    filename: `${root}/db/blogel.db`,
    autoload: true
});

module.exports = db;