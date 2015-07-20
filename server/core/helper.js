'use babel';
/* @flow */

/**
* Helper Functions
*
* The MIT License (MIT)
* Copyright (c) 2014 Equan Pr.
*/

'use strict';

function cleanHtmlTags(content: string): string {
    return content.replace(/(<([^>]+)>)/ig, "");
}

function cleanUnwantedChars(content: string): string {
    return content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
}

function genFilename(htmlString: string): string {
    var filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString));
    return filenema_data.split(' ').join('-').toLowerCase(); 
}

module.exports = {
	genFilename: genFilename,
	cleanHtmlTags: cleanHtmlTags
}