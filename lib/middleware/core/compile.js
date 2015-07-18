/**
* Compile data with template
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
"use strict";

var fs = require('fs');
var handlebars = require('handlebars');
var mkdirp = require('mkdirp');

var root = require('../../util');
var static_folder = root.path() + '/static/';
var helper = require('./helper');

/**
 *  post example :
 *
 *  postData = {
 *      title: "Awesome Node.js",
 *      content: "FTW!",
 *      published_at: "2014/02/01"
 *  }
 *
 */
exports.compile = function(docData, callback) {
    // make sure utf-8 encoding so handlebars can compile it.
    fs.readFile(root.path() + '/template/index.hbs', 'utf-8', function(err, data){
        var pageBuilder = handlebars.compile(data);
        
        var docContent = {
                filename: helper.genFilename(docData.title),
                content: pageBuilder(docData),
                date_created: docData.date_created
        };

        saveCompiled(docContent, function(err, status){
            if (err) { 
                callback(err, null);
            } else {
                callback(null, status);    
            }
        });
    });
}

function saveCompiled(data, callback) {
    var filename = data.filename + ".html";
    //create dir based on date
    var postDir = static_folder+'/'+data.date_created.year+'/'+data.date_created.month+'/'+data.date_created.date; 
    mkdirp(postDir, function(err){
        if(err) {
            console.log(err);
        } else {   
            fs.writeFile(postDir +'/'+ filename, data.content, function(err) {
                if (err) return callback(err, null);
                callback(null, filename);
            });            
        }
    });
}
