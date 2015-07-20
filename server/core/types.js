'use babel';
/* @flow */

export type Post = {
    title: string,
    content: string,
    postCreated : any,
    postPublished: string,
    lastUpdated: string, 
    status: string
}

export type PostCreated = {
    year: string,
    month: string,
    date: string
}

export type PostDocument = {
    filename: string,
    postCreated: PostCreated, 
    compiledContent: string,
    post: Post
}

