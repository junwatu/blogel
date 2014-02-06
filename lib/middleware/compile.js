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

    // make sure utf-8 encoding so handlebars can compile it.
    template = fs.readFileSync(root.path() + '/template/index.hbs', 'utf-8'),
    static_folder = root.path()+'/static/';

/**
 *  Save Mode are:
 *
 *  1. year/month/date
 *  2. simple path
 *
 */
function pathMode(mode, data) {

    //TODO:cek mode
    //TODO: strip special character

	//string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
    
    var filename = "compiled.html";
    fs.writeFile(static_folder+filename, data, function(err) {
        if (err) throw err;
        console.log('saved in ' + static_folder+filename);
    });
}

/**
 *  example :
 *
 *  docData = {
 *		title: "Awesome Node.js",
 *		content: "FTW!",
 *      published_at: "2014/02/01"
 *  }
 *
 */
exports.compile = function(docData) {

    var pageBuilder = handlebars.compile(template),
        pageText = pageBuilder(docData),
        mode = null;

    pathMode(mode, pageText);
}
