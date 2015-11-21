'use babel'
'use strict'

const moment = require('moment')
const app = require('../../package.json')

import type { Post, PostCreated } from '../core/types.js'
import { compile } from '../core/compile'
import { savePost, getAllPost } from '../db.js'
import { Logger } from '../logger'

exports.default = (req, res) => {
  res.render('index', {
    "title": app.name,
    "version": app.version
  })
}

exports.user = (req, res) => {
  getAllPost().then((result) => {
    res.render('list', {
      "title": app.name,
      "version": app.version,
      "blogList": result,
      "user": req.user
    });
  }, (err) => console.log(err))
}

exports.savePost = (req, res) => {
    let doc:Post = {
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
            let jsonOut = {
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


