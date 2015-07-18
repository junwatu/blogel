/**
* NeDB Database
*  
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
var Datastore = require('nedb'),
    root = require('../util'),
    db = new Datastore({
        filename: root.path()+'/db/blogel.db',
        autoload: true
    });

module.exports = db;