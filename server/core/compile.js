/* @flow */
'use strict'

import fs from 'fs'
import handlebars from 'handlebars'
import { rootPath } from '../util'

const TEMPLATE_INDEX = 'template/index.hbs'
const STATIC_FOLDER = 'static'
const static_folder = `${root}/${STATIC_FOLDER}/`
const root = rootPath()

import { mkdirp } from 'mkdirp'
import { genFilename, cleanHtmlTags } from './helper.js'
import { getDbConnection } from '../db.js'
import type { Post, PostCreated, PostDocument } from './types.js'

function compile (docData: Post): Promise {
  return new Promise((resolve, reject) => {
    let { title, postCreated } = docData

    fs.readFile(`${root}/${TEMPLATE_INDEX}`, 'utf-8', (err, data) => {
      let pageBuilder = handlebars.compile(data)
      let dateCreated:PostCreated = {
        year: postCreated.getFullYear(),
        month: postCreated.getMonth(),
        date: postCreated.getDate()
      }
      let docContent:PostDocument = {
        filename: `${genFilename(title)}.html`,
        compiledContent: pageBuilder(docData),
        postCreated: dateCreated,
        post: docData
      };
    
      saveCompiled(docContent).then((status) => resolve(status), (err) => reject(err))
      })
    })
}

function saveCompiled(data: PostDocument): Promise {
    var { filename, postCreated: { year: y, month: m, date: d}, compiledContent, post } = data
    var postDir = `${static_folder}/${y}/${m}/${d}`
    var filepath = `${postDir}/${filename}`

    return new Promise((resolve, reject) => {
        mkdirp(postDir, (err) => {
            if (!err) {
                var { title: postTitle, status: postStatus, postCreated: pCreated } = post

                fs.writeFile(filepath, compiledContent, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            title: cleanHtmlTags(postTitle),
                            status: postStatus,
                            created: pCreated,
                            filename: filename
                        });
                    }
                })
            } else {
                console.log(err)
                return null
            }
       })
    })
}

module.exports = { compile, saveCompiled }
