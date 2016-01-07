'use strict'

import Box from 't3js'
import MediumEditor from 'medium-editor'
import Navigation from './blogel/module/navigation'
import Post from './blogel/service/post'

var service = Box.Application.getService('post')
var idStatus = document.getElementById('status')

window.editor = new MediumEditor(document.querySelectorAll('.editable'), {
  toolbar: {
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'pre'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    standardizeSelectionStart: false,
    static: false,
    align: 'center',
    sticky: false,
    updateOnEmptySelection: false
  },
  paste: {
    cleanPastedHTML: true,
    forcePlainText: false
  }
})


if (idStatus) {
  var postId = idStatus.getAttribute('title')
  if(postId){
    service.getPostById(postId).then(function (data) {
      editor.setContent(data.post.title, 0)
      editor.setContent(data.post.content, 1)
    }, function (error) {
      console.log(error)
    })
  }
}

function onPublish (event) {
  console.log('publish-btn clicked!')
}

function onUpdate (event) {
  var content = editor.serialize()
  var postId = idStatus.getAttribute('title')
  var post_content_update = {
    post: {
      title: content['element-0'],
      content: content['element-1'],
      status: 'draft',
      id: postId
    }
  }

  service.updatePost(post_content_update).then(function (data) {
    console.log(data)
    editor.setContent(data.title, 0)
    editor.setContent(data.content, 1)
  }, function (error) {
    console.log(error)
  })
}

function onSetting (event) {
  console.log('setting-btn clicked!')
}

function onDeleteDoc (event) {
  console.log('trash-btn clicked!')
  var postId = idStatus.getAttribute('title')

  service.deletePost(postId).then(function (data) {
    console.log(data)
    window.location.href = '/'
  }, function(err) {
    console.log(err)
  })
}

$('#publish-btn').on('click', onPublish)
$('#update-btn').on('click', onUpdate)
$('#setting-btn').on('click', onSetting)
$('#delete-btn').on('click', onDeleteDoc)

Box.Application.init({
  debug: true
})
