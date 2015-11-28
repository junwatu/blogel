/* @flow */

'use babel'

'use strict'

const moment = require('moment')
const app = require('../../package.json')
const striptags = require('striptags')

import type { Post, PostCreated } from '../core/types.js'

import { compile } from '../core/compile'
import { Logger } from '../logger'
import { savePost, getAllPost, getPostById, updateThePost } from '../db.js'

function defaultRoute (req: any, res: any) {
  res.render('index', { "title": app.name, "version": app.version })
}

function api (req: any, res: any) {
  res.json({ api: app.version, description: app.description })
}

function user (req: any, res: any) {
  getAllPost().then((result) => {
    
    result.forEach((el, index, array) => {
      result[index].title = striptags(result[index].title)
    })

    res.render('list', {
      "title": app.name,
      "version": app.version,
      "blogList": result,
      "user": req.user
    });
  }, (err) => console.log(err))
}

function getPostView (req: any, res: any) {
  let postId = req.params.id
  getPostById(postId).then((result) => {
    res.render('edit', { post: result })
  })
}

function savePostAPI (req: any, res: any) {
  let now = new Date()
  let doc: Post = {
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

function listPostsAPI (req: any, res: any) {
  getAllPost().then((result) => {
    res.json(result)  
  }, (err) => console.log(err))
}

function listDraftPostsAPI (req: any, res: any) {
  res.json({
    process: 'list draft posts'
  });
}

function listPublishedPostsAPI (req: any, res: any) {
  res.json({
    process: 'list published posts'
  });
}

function getPostAPI (req: any, res: any) {
  let postId = req.params.id
  getPostById(postId).then((result) => {
    res.json({ post: result })
  })
}
function updatePostAPI (req: any, res: any) {
  let now = new Date()
  let doc: Post = {
    title: req.body.post.title.value,
    content: req.body.post.content.value,
    postCreated : now.toString(),
    postPublished: '',
    lastUpdated: now.toString(),
    status: req.body.post.status,
    author: '',
    tags: ['hello', 'world'],
    generated_keys: req.params.id
  }
  
  updateThePost(doc).then((result) => {
    res.json(result)
  })
}

function deletePostAPI (req: any, res: any) {
    res.json({
        process: 'delete post'
    });
}

function loginPage (req: any, res: any) {
  res.render('login', {
    title: app.name,
    version: app.version,
    message: req.flash('loginMessage')
  });
}

function signupPage (req: any, res: any) {
  res.render('signup', {
    title: app.name,
    version: app.version,
    message: req.flash('signupMessage')
  })
}

function logout (req: any, res: any) {
  req.logout()
  res.redirect('/')
}

module.exports = {
  defaultRoute,
  user,
  savePostAPI,
  api,
  listPostsAPI,
  listDraftPostsAPI,
  listPublishedPostsAPI,
  getPostAPI,
  getPostView,
  updatePostAPI,
  deletePostAPI,
  loginPage,
  signupPage,
  logout
}
