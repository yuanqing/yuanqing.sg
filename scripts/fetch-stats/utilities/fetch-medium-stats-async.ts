import { JSDOM } from 'jsdom'

const fetch = require('isomorphic-unfetch')

export async function fetchMediumStatsAsync(urls: {
  [key: string]: string
}): Promise<{ [key: string]: string }> {
  const result: { [key: string]: string } = {}
  for (const id in urls) {
    result[id] = await fetchMediumArticleClapCountAsync(urls[id])
  }
  return result
}

async function fetchMediumArticleClapCountAsync(url: string): Promise<string> {
  const response = await fetch(url)
  const html = await response.text()
  const document = new JSDOM(html).window.document
  const clapSvgElement = document.querySelector(
    '[data-test-id="post-sidebar"] [aria-label="clap"]'
  )
  let parentElement = clapSvgElement
  while (parentElement.children.length === 1) {
    parentElement = parentElement.parentElement
  }
  return parentElement.textContent.trim()
}
