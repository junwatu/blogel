'use babel';
/**
* Pring App Routes
*
* The MIT License (MIT)
* Copyright (c) 2015 Equan Pr.
*/
'use strict';
var app = require('../../package.json');
var moment = require('moment');
var { compile } = require('../core/compile');

import type { Post, PostCreated } from '../core/types.js';

exports.default = (req, res) => {
    res.render('index', {
        "title": app.name,
        "version": app.version
    });
}

exports.user = (req, res) => {

    // TODO : get the latest draft or published post

    res.render('edit', {
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

exports.savePost = (req, res) => {
    // Assume is the new Post
    let doc:Post = {
        title: req.body.post.title.value,
        content: req.body.post.content.value,
        postCreated : new Date(),
        postPublished: '',
        lastUpdated: new Date(), 
        status: req.body.post.status
    };

    compile(doc).then((status) => {
        res.json({
            generate: status
        });
    }, (err) => {
        res.json({
            error: err
        })
    });
}

exports.api = (req, res) => {
    res.json({
        api: app.version,
        description: app.description
    })
}

exports.listPosts = (req, res) => {
    res.json({
        process: 'list posts'
    });
}

exports.getPost = (req, res) => {
    res.json({
        process: 'get post'
    });
}

exports.updatePost = (req, res) => {
    res.json({
        process: 'update post'
    });
}

exports.deletePost = (req, res) => {
    res.json({
        process: 'delete post'
    });
}

exports.loginPage = (req, res) => {
    res.render('login', {
        title: app.name,
        version: app.version,
        message: req.flash('loginMessage')
    });
}

exports.signupPage = (req, res) => {
    res.render('signup', {
        title: app.name,
        version: app.version,
        message: req.flash('signupMessage')
    });
}
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}