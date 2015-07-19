/**
* Post Model
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';
const database = require('../middleware/db');

function Lembar(doc){
	for(var key in doc){
		this[key] = doc[key];
	}
}

module.exports = Lembar;








