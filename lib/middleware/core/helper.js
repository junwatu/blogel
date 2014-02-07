
exports.cleanHtmlTags = function(content) {
    // strip html tags
    var htmlTagsFree = content.replace(/(<([^>]+)>)/ig, "");
    return htmlTagsFree;
}

function cleanUnwantedChars(content) {
    // clean unwanted chars
    var cleanContent = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    return cleanContent;
}

function genFilename(htmlString) {
    var filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString)),
        filename = filenema_data.split(' ').join('-').toLowerCase();

    return filename;
}