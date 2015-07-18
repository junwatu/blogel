/**
* Pring App Routes
*
* The MIT License (MIT)
* Copyright (c) 2015 Equan Pr.
*/

var app = require('../../package.json');
var moment = require('moment');
var main = require('../middleware/core/compile');

exports.default = function(req, res) {
    res.render('index', {
        "title": app.name,
        "version": app.version
    });
}

// for authenticated user only
exports.user = function(req, res) {

    // TODO : get the latest draft or published post

    res.render('useredit', {
        "title": app.name,
        "version": app.version,
        "page-status": "Draft",
        "page-date": moment().format("DD MMM YYYY"),
        "title": 'Title',
        "content": "Content",
        "user-status": "Logout",
        "user": req.user
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

exports.loginPage = function(req, res) {
    res.render('login', {
        title: app.name,
        version: app.version,
        message: req.flash('loginMessage')
    });
}

exports.signupPage = function(req, res) {
    res.render('signup', {
        title: app.name,
        version: app.version,
        message: req.flash('signupMessage')
    });
}
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
