/**++++++++++++++++++++++++++
*  Compile data with template
* +++++++++++++++++++++++++++
*
*
The MIT License (MIT)

Copyright (c) 2014 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
var fs = require('fs'),
    root = require('../util'),
    handlebars = require('handlebars'),
    static_folder = root.path() + '/static/';

function saveCompiled(data, callback) {

    var filename = data.filename + ".html";
    fs.writeFile(static_folder + filename, data.content, function(err) {
        if (err) callback(null, err);

        callback('saved as ' + filename, null);
    });
}

function genFilename(title) {
    var htmltagsfree = title.replace(/(<([^>]+)>)/ig, ""),
        ctitle = htmltagsfree.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        filename_gen = ctitle.split(' ').join('-').toLowerCase();

    return filename_gen;
}

/**
 *  example :
 *
 *  docData = {
 *      title: "Awesome Node.js",
 *      content: "FTW!",
 *      published_at: "2014/02/01"
 *  }
 *
 */
exports.compile = function(docData, callback) {

    // make sure utf-8 encoding so handlebars can compile it.
    fs.readFile(root.path() + '/template/index.hbs', 'utf-8', function(err, data) {
        var pageBuilder = handlebars.compile(data),
            pageText = pageBuilder(docData),
            docContent = {
                filename: genFilename(docData.title),
                content: pageText
            }

        saveCompiled(docContent, function(status, err) {
            if (err) callback(null, err);
            console.log(status);
            callback(status);
        });
    });
}
