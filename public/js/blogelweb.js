'use strict'

var MediumEditor = require('medium-editor')
var editor = new MediumEditor(document.querySelectorAll('.editable'), {
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

var idStatus = document.getElementById('status')
if (idStatus) {
  var postId = idStatus.getAttribute('title')
  update(postId)
}

function update (id) {
  $.ajax({
    url: '/posts/' + id,
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(data)
      editor.setContent(data.post.title, 0)
      editor.setContent(data.post.content, 1)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function onNewDocument(event) {
  console.log('New Document clicked!')
}

function onPublish (event) {
  console.log('publish-btn clicked!')
}

function onSave (event) {
  var content = editor.serialize()
  var post_content = {
    post: {
      title: content['element-0'],
      content: content['element-1'],
      status: 'draft'
    }
  }

  $.ajax({
    url: '/api/posts',
    type: 'post',
    data: post_content,
    dataType: 'json',
    success: function (data) {
      console.log('Save Post')
      console.log(data)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function onUpdate (event) {
  var content = editor.serialize()
  var post_content_update = {
    post: {
      title: content['element-0'],
      content: content['element-1'],
      status: 'draft'
    }
  }

  var idStatus = document.getElementById('status')
  var postId = idStatus.getAttribute('title')

  $.ajax({
    url: '/api/posts/' + postId,
    type: 'put',
    data: post_content_update,
    dataType: 'json',
    success: function (data) {
      console.log(data)
      editor.setContent(data.title, 0)
      editor.setContent(data.content, 1)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function onSetting (event) {
  console.log('setting-btn clicked!')
}

function onDeleteDoc (event) {
  console.log('trash-btn clicked!')
}

$('#new-btn').on('click', onNewDocument)
$('#publish-btn').on('click', onPublish)
$('#save-btn').on('click', onSave)
$('#update-btn').on('click', onUpdate)
$('#setting-btn').on('click', onSetting)
$('#trash-btn').on('click', onDeleteDoc)
