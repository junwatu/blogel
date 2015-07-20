/**
* NeDB Database
*  
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
var Datastore = require('nedb');
var root = require('../util');
var db = new Datastore({
    filename: root.path()+'/db/blogel.db',
    autoload: true
});

module.exports = db;