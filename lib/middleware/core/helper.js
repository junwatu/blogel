/**
* Helper Functions
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/

'use strict';

// strip html tags
function cleanHtmlTags(content) {
    return content.replace(/(<([^>]+)>)/ig, "");
}

// clean unwanted chars
function cleanUnwantedChars(content) {
    return content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
}

// generate filename without extension
exports.genFilename = (htmlString) => {
    let filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString));
    return filenema_data.split(' ').join('-').toLowerCase(); 
}
