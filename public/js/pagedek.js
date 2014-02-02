 /**
  *	Main Application JS
  */
 var elements = document.querySelectorAll('.editable'),
     editor = new MediumEditor(elements, {
         anchorInputPlaceholder: 'Type a link',
         buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote', 'pre', 'image'],
         firstHeader: 'h1',
         secondHeader: 'h2',
         delay: 0,
         targetBlank: true
     });

$('#save-btn').on('click', function(){
    var content = editor.serialize();
    console.log(content);
});