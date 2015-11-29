/* @flow */
'use strict'

import moment from 'moment'
import type { Post, PostCreated } from '../core/types.js'
import { compile } from '../core/compile'
import { Logger } from '../logger'
import { savePost, getAllPost, getPostById, updateThePost } from '../db.js'

const app = require('../../package.json')
const striptags = require('striptags')

export default class Api {
  constructor () {}
  
  info (req: any, res: any) {
    res.json({ api: app.version, description: app.description })
  }

  savePostAPI (req: any, res: any) {
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
    }

    savePost(doc).then((result) => {
      compile(doc).then((status) => {
        let jsonOut = { post: status, id: result.generated_keys }
        res.json(jsonOut)
      }, (err) => res.json({ error: err }))
    }, (err) => res.json({ error: err }))
  }

  updatePostAPI (req: any, res: any) {
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
  
    updateThePost(doc).then((result) => res.json(result))
  }

  listPostsAPI (req: any, res: any) {
    getAllPost().then((result) => {
      res.json(result)  
    }, (err) => console.log(err))
  }

  listDraftPostsAPI (req: any, res: any) {
    res.json({
      process: 'list draft posts'
    })
  }

  listPublishedPostsAPI (req: any, res: any) {
    res.json({
      process: 'list published posts'
    })
  }

  getPostAPI (req: any, res: any) {
    let postId = req.params.id
      getPostById(postId).then((result) => {
        res.json({ post: result })
    })
  }

  deletePostAPI (req: any, res: any) {
    res.json({
      process: 'delete post'
    })
  }
}
