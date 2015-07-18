/**
* Helper Functions
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/

"use strict";

// strip html tags
 function cleanHtmlTags(content) {
    var htmlTagsFree = content.replace(/(<([^>]+)>)/ig, "");
    return htmlTagsFree;
}

// clean unwanted chars

function cleanUnwantedChars(content) {
    var cleanContent = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

    return cleanContent;
}

// generate filename without extension

exports.genFilename = function(htmlString) {
    var filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString)),
        filename = filenema_data.split(' ').join('-').toLowerCase();

    return filename;
}
