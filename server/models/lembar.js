'use strict';

var database = require('../db');

function Lembar(doc){
	for(let key in doc){
		this[key] = doc[key];
	}
}

module.exports = Lembar;
