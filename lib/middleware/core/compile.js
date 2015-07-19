/**
* Compile data with template
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
'use strict';

const fs = require('fs');
const handlebars = require('handlebars');
const mkdirp = require('mkdirp');
const root = require('../../util');
const static_folder = root.path() + '/static/';
const helper = require('./helper');

/**
 *  New Post 
 *  - example
 *
 *  postData = {
 *      title: "Awesome Node.js",
 *      content: "FTW!",
 *      published_at: "2014/02/01"
 *  }
 */
exports.compile = (docData) => {
    return new Promise((resolve, reject) => {
            // make sure utf-8 encoding so handlebars can compile it.
            fs.readFile(`${root.path()}/template/index.hbs`, 'utf-8', (err, data) => {
            let pageBuilder = handlebars.compile(data);
            let docContent = {
                filename: helper.genFilename(docData.title),
                content: pageBuilder(docData),
                date_created: docData.date_created
            };

            saveCompiled(docContent).then((status) => {
                resolve(status);    
            }, (err) => {
                reject(err);
            }) 
        });
    });
}

function saveCompiled(data) {  
    return new Promise((resolve, reject) => {
        let filename = `${data.filename}.html`;
        let postDir = `${static_folder}/${data.date_created.year}/${data.date_created.month}/${data.date_created.date}`;
        
        mkdirp(postDir, (err) => {
            if(!err) {
                fs.writeFile(postDir +'/'+ filename, data.content, (err) => {
                    (err) ? reject(err) : resolve(filename);
                });            
            }
       });
    });
}