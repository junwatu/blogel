Box.Application.addModule('navigation', (context) => {
  'use strict'

  return {
  	onclick: (event, element, elementType) => {
      switch (elementType) {
        case 'new-btn':
          console.log('New Post')
          break
        case 'update-btn':
          console.log('Update Post')
          break
        case 'edit-btn':
          console.log('Edit Post')
          break
        default:
          //
      }
    }
  }
})