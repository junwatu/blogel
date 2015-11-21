/* @flow */

'use babel'

'use strict'

const moment = require('moment')
const app = require('../../package.json')

import type { Post, PostCreated } from '../core/types.js'

import { savePost, getAllPost, getPostById } from '../db.js'
import { compile } from '../core/compile'
import { Logger } from '../logger'

function defaultRoute (req:any, res:any) {
  res.render('index', { "title": app.name, "version": app.version })
}

function api (req: any, res: any) {
  res.json({ api: app.version, description: app.description })
}

function user (req:any, res:any) {
  getAllPost().then((result) => {
    res.render('list', {
      "title": app.name,
      "version": app.version,
      "blogList": result,
      "user": req.user
    });
  }, (err) => console.log(err))
}

function saveNewPost (req:any, res:any) {
  let now = new Date()
  let doc:Post = {
    title: req.body.post.title.value,
    content: req.body.post.content.value,
    postCreated : now.toString(),
    postPublished: '',
    lastUpdated: now.toString(),
    status: req.body.post.status,
    author: '',
    tags: ['hello', 'world']
  };

  savePost(doc).then((result) => {
    compile(doc).then((status) => {
      let jsonOut = { post: status, id: result.generated_keys }
      res.json(jsonOut)
    }, (err) => res.json({ error: err }))
    }, (err) => res.json({ error: err }))
}

function listPosts (req:any, res:any) {
  getAllPost().then((result) => {
    res.json(result)  
  }, (err) => console.log(err))
}

function listDraftPosts (req:any, res:any) {
    res.json({
        process: 'list draft posts'
    });
}

function listPublishedPosts (req:any, res:any) {
    res.json({
        process: 'list published posts'
    });
}

function getPost (req:any, res:any) {
  let postId = req.params.id
  getPostById(postId).then((result) => {
    res.json(result)
  })
}

function updatePost (req:any, res:any) {
    res.json({
        process: 'update post'
    });
}

function deletePost (req:any, res:any) {
    res.json({
        process: 'delete post'
    });
}

function loginPage (req:any, res:any) {
  res.render('login', {
    title: app.name,
    version: app.version,
    message: req.flash('loginMessage')
  });
}

function signupPage (req:any, res:any) {
  res.render('signup', {
    title: app.name,
    version: app.version,
    message: req.flash('signupMessage')
  })
}

function logout (req:any, res:any) {
  req.logout()
  res.redirect('/')
}

module.exports = {
  defaultRoute,
  user,
  saveNewPost,
  api,
  listPosts,
  listDraftPosts,
  listPublishedPosts,
  getPost,
  updatePost,
  deletePost,
  loginPage,
  signupPage,
  logout
}
