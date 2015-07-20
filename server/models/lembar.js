/**
* Post Model
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
var database = require('../middleware/db');

function Lembar(doc){
	for(let key in doc){
		this[key] = doc[key];
	}
}

module.exports = Lembar;








