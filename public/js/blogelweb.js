(function() {
    'use strict';
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
        }
    });

    function onNewDocument(event) {
        console.log('New Document clicked!');
    }

    function onPublish(event) {
        console.log('publish-btn clicked!');
    }

    function onSave(event) {
        var content = editor.serialize(),
            post_content = {
                post: {
                    title: content['element-0'],
                    content: content['element-1'],
                    status: "draft"
                }
            };

        $.ajax({
            url: '/api/posts',
            type: 'post',
            data: post_content,
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    function onSetting(event) {
        console.log('setting-btn clicked!');
    }

    function onDeleteDoc(event) {
        console.log('trash-btn clicked!');
    }

    $('#new-btn').on('click', onNewDocument);
    $('#publish-btn').on('click', onPublish);
    $('#save-btn').on('click', onSave);
    $('#setting-btn').on('click', onSetting);
    $('#trash-btn').on('click', onDeleteDoc);
})();
