/* @flow */
'use strict'

export function cleanHtmlTags (content: string): string {
  return content.replace(/(<([^>]+)>)/ig, '')
}

function cleanUnwantedChars (content: string): string {
  return content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
}

export function genFilename (htmlString: string): string {
  let filenema_data = cleanUnwantedChars(cleanHtmlTags(htmlString))
  return filenema_data.split(' ').join('-').toLowerCase()
}