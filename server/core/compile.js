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
var { genFilename, cleanHtmlTags } = require('./helper');

import type { Post, PostCreated, PostDocument } from './types.js';

function compile(docData:Post): Promise {
    return new Promise((resolve, reject) => {

        var { title, postCreated } = docData;
        
        fs.readFile(`${root}/${TEMPLATE_INDEX}`, 'utf-8', (err, data) => {
            var pageBuilder = handlebars.compile(data);
            
            var dateCreated:PostCreated = {
                year: postCreated.getFullYear(),
                month: postCreated.getMonth(),
                date: postCreated.getDate()
            };

            var docContent:PostDocument = {
                filename: `${genFilename(title)}.html`,
                compiledContent: pageBuilder(docData),
                postCreated: dateCreated,
                post: docData
            };

            saveCompiled(docContent).then((status) => {
                resolve(status);    
            }, (err) => {
                reject(err);
            }) 
        });
    });
}

function saveCompiled(data: PostDocument): Promise {
    var { filename, postCreated: { year: y, month: m, date: d}, compiledContent, post:{title:postTitle, status: postStatus, postCreated: pCreated}} = data;
    var postDir = `${static_folder}/${y}/${m}/${d}`;
    var filepath = `${postDir}/${filename}`;

    return new Promise((resolve, reject) => {
        mkdirp(postDir, (err) => {
            if(!err) {
                fs.writeFile(filepath, compiledContent, (err) => {
                    if(err) { 
                        reject(err);
                    } else {
                        resolve({
                            title: cleanHtmlTags(postTitle),
                            status: postStatus,
                            created: pCreated,
                            filename: filename
                        });  
                    } 
                });            
            } else {
                console.log(err);
                return null;
            }
       });
    });
}

module.exports = { compile, saveCompiled };