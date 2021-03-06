/* @flow */
'use strict'

import type { Post, Author, PostSum } from './core/types.js'
import r from 'rethinkdb'
import { Logger } from './logger'

const DB_NAME = 'blogel'
const POST_TABLE_NAME = 'posts'
const AUTHORS_TABLE_NAME = 'authors'
const options = { host: 'localhost', port: 28015, authkey:'', db:DB_NAME}

let Log = Logger()

function init() {
    getDbConnection().then((conn) => {
      dbIsExist(conn).then((status) => {
        if(!status.exist) {
          createDatabase(conn)
          .then(initPostTable(conn))
          .then(initAuthorTable(conn))
          .catch((err) => Log.error(err))
        }
      }, (err) => Log.error(err))
    }, (err) => Log.error(err))
}

function initPostTable (conn: any): Promise {
  return new Promise((resolve, reject) => {
    isTableExist(POST_TABLE_NAME, conn).then((status) => {
      if(!status.exist) {
        createTable(POST_TABLE_NAME, status.conn).then((result) => {
          Log.info(`Create ${POST_TABLE_NAME} table`)
          resolve(true)
        }, (err) => {
          Log.info(err)
          reject(err)
        })
      } else {
        resolve(true)
      }
    })
  })
}

function initAuthorTable (conn: any): Promise {
  return new Promise((resolve, reject) => {
    isTableExist(AUTHORS_TABLE_NAME, conn).then((status) => {
      if(!status.exist) {
        createTable(AUTHORS_TABLE_NAME, status.conn).then(() => {
          Log.info(`Create ${AUTHORS_TABLE_NAME} table`)
          resolve(true)
        }, (err) => {
          Log.info(err)
          reject(err) })
      } else {
        resolve(true)
      }
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

function isTableExist(tableName: string, conn: any): Promise {
    return new Promise( (resolve, reject) => {
        r.db(DB_NAME).tableList().run(conn, (err,table) => {
            if(err) {
                reject(err);
            } else {
                var _tableName: boolean = false;
                table.forEach((v,i,a) => {
                    if(v === tableName) {
                        _tableName = true;
                    }
                })
                _tableName ? resolve({ exist:true, conn:conn}) : resolve({ exist:false, conn:conn});
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

function createTable(tableName: string, conn: any): Promise {
    return new Promise((resolve, reject) => {
        r.db(DB_NAME).tableCreate(tableName).run(conn, (err, res) => {
            err ? reject(err) : resolve({ res: res, conn: conn });
        })
    })
}

function getDbConnection(): Promise {
    return r.connect(options);
}

function savePost(post:Post): Promise {
    return new Promise((resolve, reject) => {
        getDbConnection().then((conn) => {
            r.db(DB_NAME).table(POST_TABLE_NAME).insert(post).run(conn, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        })
    })
}

function getAllPostSum(): Promise {
  let allPostSum: Array<PostSum> = []

  return new Promise((resolve, reject) => {
    getDbConnection().then((conn) => {
      r.db(DB_NAME).table(POST_TABLE_NAME).run(conn, (err, cursor) => {
        if (err) {
          reject(err)
        } else {
          cursor.each((err, row) => {
            let post = {}
            post.id = row.id
            post.title = row.title
            post.status = row.status
            post.author = row.author

            if(!err) allPostSum.push(post)
          })
          resolve(allPostSum)
        }
      })
    })
  })
}

function getAllPost(): Promise {
  let allPost: Array<Post> = []

  return new Promise((resolve, reject) => {
    getDbConnection().then((conn) => {
      r.db(DB_NAME).table(POST_TABLE_NAME).run(conn, (err, cursor) => {
        if (err) {
          reject(err)
        } else {
          cursor.each((err, row) => {
            if(!err) allPost.push(row)
          })
          resolve(allPost)
        }
      })
    })
  })
}

function getAllPostDraft(): Promise {
  let allPostDraft: Array<Post> = []

  return new Promise((resolve, reject) => {
    getDbConnection().then((conn) => {
      r.db(DB_NAME).table(POST_TABLE_NAME).filter({status: 'draft'}).run(conn, (err, cursor) => {
        if (err) {
          reject(err)
        } else {
          cursor.each((err, row) => {
            if(!err) allPostDraft.push(row)
          })
          resolve(allPostDraft)
        }
      })
    })
  })
}

function getPostById(id:string): Promise {
    return new	Promise((resolve, reject) => {
        getDbConnection().then((conn) => {
	        r.db(DB_NAME).table(POST_TABLE_NAME).get(id).run(conn, function(err, result){
	            err ? reject(err) : resolve(result);
	        })
	    })
    });
}

function updateThePost(post:Post): Promise {
    console.log(post)    
    return new Promise((resolve, reject) => {
        getDbConnection().then((conn) => {
	        if(post.id != null){
            r.db(DB_NAME).table(POST_TABLE_NAME).get(post.id).update(post).run(conn, (err, status) => {
              Log.info(status)
              err ? reject(err) : resolve(post);
            })
          } else {
            Log.error('No such a post')
            reject('No such a post')
          }
	      })
    });
}

function deletePost(id:string): Promise {
    return new Promise((resolve, reject) => {
      getDbConnection().then((conn) => {
	      r.db(DB_NAME).table(POST_TABLE_NAME).get(id).delete().run(conn, (err, result) => {
	        err ? reject(err) : resolve(result);
	      });
	  })
    })
}

function saveAuthor(author: Author): Promise {
    return new Promise((resolve, reject) => {
      getDbConnection().then((conn) => {
	      r.db(DB_NAME).table(AUTHORS_TABLE_NAME).insert(author).run(conn, (err, result) => {
	        err ? reject(err) : resolve(result);
	      })
	    })
    })
}

function deleteAuthor(id: string): Promise {
    return new Promise((resolve, reject) => {
      getDbConnection().then((conn) => {
	      r.db(DB_NAME).table(AUTHORS_TABLE_NAME).get(id).delete().run(conn, (err, result) => {
	        err ? reject(err) : resolve(result);
	      })
	    })
    });
}

function getAuthorById(id: string): Promise {
    return new Promise((resolve, reject) => {
      getDbConnection().then((conn) => {
	      r.db(DB_NAME).table(AUTHORS_TABLE_NAME).get(id).run(conn, (err, result) => {
	        err ? reject(err) : resolve(result);
	      })
	    })
    })
}

function updateAuthor(author: Author): Promise {
    return new Promise((resolve, reject) => {
      getDbConnection().then((conn) => {
          if(author.generated_keys != null){
              r.db(DB_NAME).table(AUTHORS_TABLE_NAME).get(author.generated_keys[0]).update(author).run(conn, (err, result) => {
                  err ? reject(err) : resolve(result);
              })
          }
	    })
    })
}

function getPostByAuthor(authorId: string): Array<Post> {
    var postsByAuthor: Array<Post> = []
    return postsByAuthor;
}

module.exports = {
    DB_NAME,
    POST_TABLE_NAME,
    AUTHORS_TABLE_NAME,
    init,
    getDbConnection,
    getAllPost,
    getPostById,
    getPostByAuthor,
    savePost,
    updateThePost,
    deletePost,
    saveAuthor,
    deleteAuthor,
    getAuthorById,
    updateAuthor
}
