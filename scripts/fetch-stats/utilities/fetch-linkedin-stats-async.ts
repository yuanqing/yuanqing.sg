import { JSDOM } from 'jsdom'

import { formatNumber } from './format-number'

const fetch = require('isomorphic-unfetch')

export async function fetchLinkedInStatsAsync(urls: {
  [key: string]: string
}): Promise<{ [key: string]: string }> {
  const result: { [key: string]: string } = {}
  for (const id in urls) {
    result[id] = await fetchLinkedInPostResponseCountAsync(urls[id])
  }
  return result
}

async function fetchLinkedInPostResponseCountAsync(
  url: string
): Promise<string> {
  const response = await fetch(url)
  const html = await response.text()
  const document = new JSDOM(html).window.document
  const element = document.querySelector(
    '.social-counts-reactions__social-counts-numRections'
  )
  return formatNumber(parseInt(element.textContent.trim(), 10))
}
