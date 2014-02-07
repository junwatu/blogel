/**
 * Main Application JS
 */

(function() {

    'use strict';

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
     * Event Handlers
     */

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
                    date_create: Date.now(),
                    last_update: Date.now(),
                    status: "draft"
                }
            };

        $.ajax({
            url: '/post',
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

    /**
     * Register Event Handlers
     */
    $('#new-btn').on('click', onNewDocument);
    $('#publish-btn').on('click', onPublish);
    $('#save-btn').on('click', onSave);
    $('#setting-btn').on('click', onSetting);
    $('#trash-btn').on('click', onDeleteDoc);

})();
