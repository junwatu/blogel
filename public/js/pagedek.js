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

 $('#new-btn').on('click', function() {
     console.log('New Document clicked!');
 });

 $('#publish-btn').on('click', function() {
     console.log('publish-btn clicked!');
 });

 $('#save-btn').on('click', function() {
     var content = editor.serialize(),
         post_content = {
             post: {
                 title: content['element-0'],
                 content: content['element-1'],
                 date_create: Date.now(),
                 last_update: Date.now(),
                 status: "draft"
             }
         },
         pdata = post_content;

     console.log(JSON.stringify(pdata));
     
     $.ajax({
        url: '/post',
        type: 'post',
        data: pdata,
        dataType: 'json',
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err);
        }
     });
 });

 $('#setting-btn').on('click', function() {
     console.log('setting-btn clicked!');
 });

 $('#trash-btn').on('click', function() {
     console.log('trash-btn clicked!');
 });
