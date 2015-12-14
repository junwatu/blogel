Box.Application.addService('post', (application) => {
  'use strict'

  let $ = application.getGlobal('jQuery')

  return {
    getAllPost: function () {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/api/posts',
          type: 'get',
          dataType: 'json',
          success: (data) => resolve(data),
          error: (err) => reject(err)
        })
      })
    },

    getPostById: function (id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/api/posts/' + id,
          type: 'get',
          dataType: 'json',
          success: (data) => resolve(data),
          error: (err) => reject(err)
        })
      })
    },

    savePost: function (post) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/api/posts',
          type: 'post',
          data: post,
          dataType: 'json',
          success: (data) => resolve(data),
          error: (err) => reject(err)
        })
      })
    },

    updatePost: function (post) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/api/posts/' + post.id,
          type: 'put',
          data: post,
          dataType: 'json',
          success: (data) => resolve(data),
          error: (err) => reject(err)
        })
      })
    },

    deletePost: function(id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/api/posts/' + id,
          type: 'delete',
          data: id,
          dataType: 'json',
          success: (data) => resolve(data),
          error: (err) => reject(err)
        })
      })
    }
  }
})
