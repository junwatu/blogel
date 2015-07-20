'use babel';
/* @flow */

export type Post = {
    title: string,
    content: string,
    dateCreated : string,
    datePublished: string,
    lastUpdated: string, 
    status: string
}

export type PostCreated = {
    year: string,
    month: string,
    date: string
}
