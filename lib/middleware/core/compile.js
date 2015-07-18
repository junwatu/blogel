/**
* Compile data with template
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/
"use strict";

var fs = require('fs'),
    root = require('../../util'),
    handlebars = require('handlebars'),
    static_folder = root.path() + '/static/',
    helpers = require('./helper');

function saveCompiled(data, callback) {

    var filename = data.filename + ".html";
    fs.writeFile(static_folder + filename, data.content, function(err) {
        if (err) callback(null, err);

        callback('saved as ' + filename, null);
    });
}

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
    fs.readFile(root.path() + '/template/index.hbs', 'utf-8', readFileHandler);

    function readFileHandler(err, data) {
        var pageBuilder = handlebars.compile(data),
            pageText = pageBuilder(docData),
            docContent = {
                filename: helpers.genFilename(docData.title),
                content: pageText
            }

        saveCompiled(docContent, onSaveHandler);

        function onSaveHandler(status, err) {
            if (err) callback(null, err);
            console.log(status);
            callback(status);
        };
    }
}
