'use strict'
var MediumEditor = require('medium-editor')

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
