/* @flow */
'use babel'

export type Post = {
  title: string,
  content: string,
  postCreated : any,
  postPublished: string,
  lastUpdated: string,
  status: string,
  author: string,
  tags: Array<string>,
  generated_keys?: any
}

export type PostSum = {
  title: string,
  status: string,
  id: string,
  author: string
}

export type Author = {
  name: string,
  email: string,
  username: string,
  password: string,
  token: string,
  generated_keys?: any
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
