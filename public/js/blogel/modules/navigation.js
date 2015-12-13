Box.Application.addModule('navigation', (context) => {
  'use strict'

  let editorInst
  let service

  function onSavePost () {
    let content = editorInst.serialize()
    let post_content = {
      post: {
        title: content['element-0'],
        content: content['element-1'],
        status: 'draft'
      }
    }

    service.savePost(post_content).then(function (data) {
      console.log(data)
    }, function (error) {
      console.log(error)
    })
  }

  return {
    init: () => {
      service = context.getService('post')
      editorInst = context.getGlobal('editor')
    },

  	onclick: (event, element, elementType) => {
      switch (elementType) {
        case 'new-btn':
          console.log('New Post')
          window.location.href = '/posts/new'
          break
        case 'save-btn':
          console.log('Save Post')
          onSavePost()
          break
/**
        case 'update-btn':
          console.log('Update Post')
          break
*/
        case 'edit-btn':
          console.log('Edit Post')
          break
        case 'delete-btn':
          console.log('Delete Post')
        default:
          console.log('No Action')
      }
    }
  }
})
