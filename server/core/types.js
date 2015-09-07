'use babel';
/* @flow */

export type Post = {
    title: string,
    content: string,
    postCreated : any,
    postPublished: string,
    lastUpdated: string,
    status: string,
    author: string,
    tags: Array<string>
}

export type Author = {
    name: string,
    email: string,
    username: string,
    password: string,
    token: string
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
