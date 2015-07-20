'use babel';
/* @flow */

/**
* Compile Data With Template
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';

var TEMPLATE_INDEX = 'template/index.hbs';
var STATIC_FOLDER = 'static';

var fs = require('fs');
var handlebars = require('handlebars');
var mkdirp = require('mkdirp');
var root = require('../util').path();
var static_folder = `${root}/${STATIC_FOLDER}/`;
var { genFilename } = require('./helper');

import type { Post, PostCreated } from './types.js';

type PostDocument = {
    filename: string,
    postCreated: PostCreated, 
    compiledContent: string,
    post: Post
}

function compile(docData:Post): Promise {
    return new Promise((resolve, reject) => {
        var { title, dateCreated } = docData;
        
        fs.readFile(`${root}/${TEMPLATE_INDEX}`, 'utf-8', (err, data) => {
            var pageBuilder = handlebars.compile(data);
            var docContent = {
                filename: `${genFilename(title)}.html`,
                compiledContent: pageBuilder(docData),
                dateCreated: dateCreated
            };

            this.saveCompiled(docContent).then((status) => {
                resolve(status);    
            }, (err) => {
                reject(err);
            }) 
        });
    });
}

function saveCompiled(data:PostDocument): Promise {
    var { filename, postCreated: { year: y, month: m, date: d}, compiledContent, post } = data;
    var postDir = `${static_folder}/${y}/${m}/${d}/${filename}`;
 
    return new Promise((resolve, reject) => {
        mkdirp(postDir, (err) => {
            if(!err) {
                fs.writeFile(postDir, compiledContent, (err) => {
                    (err) ? reject(err) : resolve(post);
                });            
            }
       });
    });
}

module.exports = { compile, saveCompiled }