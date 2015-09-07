/* @flow */
'use babel';

'use strict';
var moment = require('moment');
var app = require('../../package.json');

import type { Post, PostCreated } from '../core/types.js';
import { compile } from '../core/compile';
import { savePost } from '../db.js';

exports.default = (req, res) => {
    res.render('index', {
        "title": app.name,
        "version": app.version
    });
}

exports.user = (req, res) => {

    //TODO : get the latest draft or published post

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
    let doc: Post = {
        title: req.body.post.title.value,
        content: req.body.post.content.value,
        postCreated : new Date(),
        postPublished: '',
        lastUpdated: new Date(),
        status: req.body.post.status,
        author: '',
        tags: ['hello', 'world']
    };

    savePost(doc).then((result) => {
        compile(doc).then((status) => {
            var jsonOut = {
                post: status,
                id: result.generated_keys
            }
            res.json(jsonOut);
        }, (err) => {
            res.json({ error: err });
        })
    }, (err) => {
        res.json({ error: err });
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
