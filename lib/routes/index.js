/**++++++++++++++++++
*  Pring App Routes
* +++++++++++++++++++
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
var app = require('../../package.json'),
    moment = require('moment'),
    main = require('../middleware/core/compile');

exports.default = function(req, res) {
    res.render('home', {
        "title": app.name,
        "version": app.version
    });
}

exports.home = function(req, res) {

    // TODO : get the latest draft or published post

    res.render('index', {
        "title": app.name,
        "version": app.version,
        "page-status": "Draft",
        "page-date": moment().format("DD MMM YYYY"),
        "title": 'Title',
        "content": "Content",
        "user-status": "Logout"
    });
}

exports.savePost = function(req, res) {

    var doc = {
        title: req.body.post.title.value,
        content: req.body.post.content.value
    };

    main.compile(doc, function(status, err) {
        if (err) throw err;

        res.json({
            status: status
        });
    });
}

exports.api = function(req, res) {
    res.json({
        api: app.version,
        description: app.description
    })
}

exports.listPosts = function(req, res) {
    res.json({
        process: 'list posts'
    });
}

exports.getPost = function(req, res) {
    res.json({
        process: 'get post'
    });
}

exports.updatePost = function(req, res) {
    res.json({
        process: 'update post'
    });
}

exports.deletePost = function(req, res) {
    res.json({
        process: 'delete post'
    });
}

exports.login = function(req, res) {
    res.json({
        process: 'login'
    })
}

exports.loginPage = function(req, res) {
    res.render('login', {
        "title": app.name,
        "version": app.version
    });
}

exports.signup = function(req, res) {
    res.json({
        process: 'signup'
    })
}

exports.signupPage = function(req, res) {
    res.render('signup', {
        "title": app.name,
        "version": app.version
    });
}
exports.logout = function(req, res) {
    res.json({
        process: 'logout'
    });
}
