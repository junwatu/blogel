/**
* NeDB Database
*  
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
const Datastore = require('nedb');
const root = require('../util');
const db = new Datastore({
    filename: root.path()+'/db/blogel.db',
    autoload: true
});

module.exports = db;