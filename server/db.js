'use babel';
/* @flow */

/**
* RethinkDB API
*  
* The MIT License (MIT)
* Copyright (c) 2015 Equan Pr.
*/
'use strict';

var DB_NAME = 'blogel';
var POST_TABLE_NAME = 'post';
var AUTHORS_TABLE_NAME = 'authors';

var r = require('rethinkdb');
var root = require('./util').path();
var options = { host: 'localhost', port: 28015, authkey:'', db:DB_NAME}; 

import type { Post } from './core/types.js';

var samplePost:Post = {
    title: 'Post',
    content: 'Hello, World!',
    postCreated : new Date(),
    postPublished: '22-07-2015',
    lastUpdated: '22-07-2015', 
    status: 'draft',
    author: 'Maheso Anabrang',
    tags: ['hello', 'dummy']
}

// initialize database
asyncInitDb();

function asyncInitDb(log:boolean = true) {
    getDbConnection()
    .then((conn) => {
        return createDatabase(conn);    
    })
    .then( (response) => {
        return createPostTable(response.conn);
    })
    .then( (response) => {
        return createAuthorsTable(response.conn);
    })
    .then( (res) => {
        console.log(res);
    })
    .catch( (err) => {
        console.log('Unable to connect to rethinkdb');
        console.log(err.message);
        process.exit(1);
    });
}

function createDatabase(conn: any): Promise {
    return new Promise((resolve, reject) => {
        r.dbCreate(DB_NAME).run(conn, (err, res) => {
            err ? reject(err) : resolve({ res: res, conn: conn });
        })
    })
}

function createPostTable(conn: any): Promise {
    return new Promise((resolve, reject) => {
         r.db(DB_NAME).tableCreate(POST_TABLE_NAME).run(conn, (err, res) => {
            err ? reject(err): resolve( { res: res, conn: conn });
         })
    })
}

function createAuthorsTable(conn: any): Promise {
    return new Promise((resolve, reject) => {
        r.db(DB_NAME).tableCreate(AUTHORS_TABLE_NAME).run(conn, (err, res) => {
            err ? reject(err) : resolve({ res: res, conn: conn });
        })
    })
}

function getDbConnection(): Promise {
    return r.connect(options);
}

function getAllPost(): Array<Post> {
    var allPost:Array<Post> = [samplePost, samplePost];
    return allPost;
}

function getPostById(id:string): Post {
    return samplePost;
}

function getPostByAuthor(authorId: string): Array<Post> {
    var postsByAuthor: Array<Post> = [samplePost, samplePost];
    return postsByAuthor;
}

function savePost(post:Post): boolean {
    var savePostStatus: boolean = true;
    return savePostStatus;
}

function updatePost(post:Post): number {
    var recordUpdated: number = 1;
    return recordUpdated;
}

function deletePost(id:string): number {
    var recordDeleted: number = 1;
    return recordDeleted;
}

module.exports = {
	DB_NAME,
	POST_TABLE_NAME,
	AUTHORS_TABLE_NAME,
    getDbConnection,
    getAllPost,
    getPostById,
    getPostByAuthor,
    savePost,
    updatePost,
    deletePost
}       																																																															