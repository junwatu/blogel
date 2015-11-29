/* @flow */
'use strict'

import moment from 'moment'
import type { Post, PostCreated } from '../core/types.js'
import { compile } from '../core/compile'
import { Logger } from '../logger'
import { savePost, getAllPost, getPostById, updateThePost } from '../db.js'

const app = require('../../package.json')
const striptags = require('striptags')

function defaultRoute (req: any, res: any) {
  res.render('index', { "title": app.name, "version": app.version })
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
  listPostsAPI,
  listDraftPostsAPI,
  listPublishedPostsAPI,
  getPostAPI,
  getPostView,
  deletePostAPI,
  loginPage,
  signupPage,
  logout
}
