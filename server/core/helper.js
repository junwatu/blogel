/* @flow */
'use strict'

function cleanHtmlTags (content: string): string {
  return content.replace(/(<([^>]+)>)/ig, '')
}

function cleanUnwantedChars (content: string): string {
  return content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
}

function genFilename (htmlString: string): string {
  let filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString))
  return filenema_data.split(' ').join('-').toLowerCase()
}

module.exports = { genFilename, cleanHtmlTags }
