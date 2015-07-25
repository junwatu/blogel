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

import type { Post, Author } from './core/types.js';

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

asyncInitDb();

function asyncInitDb(log:boolean = true) {
    getDbConnection()
    .then((conn) => {
        dbIsExist(conn).then((status) => {
            if(!status.exist) {
                return createDatabase(conn);
            }
            return p(status.conn);
        })
        .then( (response) => {
            postTableIsExist(response.conn).then((status) => {
                if(!status.exist) {
                    return createPostTable(status.conn);        
                }
                return p(status.conn)
            })
            .then( (response) => {
                authorsTableIsExist(response.conn).then((status) => {
                    if(!status.exist) {
                        return createAuthorsTable(response.conn);        
                    }
                    return p(status.conn);
                })
                .then( (res) => {
                    console.log('Database Ok');
                })
                .catch( (err) => {
                    console.log(err.message);
                    process.exit(1);
                });
            })
        })
    })
}

function p(conn: any): Promise {
    return new Promise((resolve, reject) => {
        resolve({conn:conn});
    })
}

function dbIsExist(conn: any): Promise {
    return new Promise((resolve, reject) => {
        r.dbList().run(conn, (err,list) => {
            if(err) {
                reject(err);
            } else {
                var blogel: boolean = false;
                list.forEach((v,i,a) => {
                    if(v === DB_NAME) {
                        blogel = true;
                    }
                })
                blogel ? resolve({ exist:true, conn:conn}):resolve({ exist:false, conn:conn});
            }
        });
    });
}

function postTableIsExist(conn: any): Promise {
    return new Promise( (resolve, reject) => {
        r.db(DB_NAME).tableList().run(conn, (err, table) => {
            if(err) {
                reject(err);
            } else { 
                var post: boolean = false;
                table.forEach( (v,i,a) => {
                    if(v === POST_TABLE_NAME) {
                        post = true;
                    }
                })
                post ? resolve({ exist:true, conn:conn}): resolve({ exist:false, conn:conn});
            }
        });
    });   
}

function authorsTableIsExist(conn: any): Promise {
    return new Promise((resolve, reject) => {
        r.db(DB_NAME).tableList().run(conn, (err,table) => {
            if(err) {
                reject(err);
            } else { 
                var author: boolean = false;
                table.forEach((v,i,a) => {
                    if(v === AUTHORS_TABLE_NAME) {
                        author = true;
                    }
                })
                author ? resolve({ exist:true, conn:conn}) : resolve({ exist:false, conn:conn});
            }
        });
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
    r.db(DB_NAME).table(POST_TABLE_NAME).run();                                                                                                                                                             
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