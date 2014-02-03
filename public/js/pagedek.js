 /**
  * Main Application JS
  */
 var elements = document.querySelectorAll('.editable'),
     editor = new MediumEditor(elements, {
         anchorInputPlaceholder: 'Type a link',
         buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote', 'pre'],
         firstHeader: 'h1',
         secondHeader: 'h2',
         delay: 0,
         targetBlank: true
     });

 /**
  * Using JQuery
  */

 $('#new-btn').on('click', function(){
    console.log('New Document clicked!');
 });

 $('#publish-btn').on('click', function() {
     console.log('publish-btn clicked!');
 });

 $('#save-btn').on('click', function() {
     var content = editor.serialize(),
         json_content = {
             "title": content['element-0'],
             "content": content['element-1'],
             "date-create": Date.now(),
             "last-update": Date.now(),
             "status": "draft"
         }

     console.log(json_content);
 });

 $('#setting-btn').on('click', function() {
     console.log('setting-btn clicked!');
 });

 $('#trash-btn').on('click', function() {
     console.log('trash-btn clicked!');
 });