import * as pProps from 'p-props'
import * as puppeteer from 'puppeteer'

export async function fetchMediumStatsAsync(urls: {
  [key: string]: string
}): Promise<{ [key: string]: string }> {
  const browser = await puppeteer.launch()
  const promises = {}
  for (const id in urls) {
    promises[id] = fetchMediumArticleClapCountAsync(id, urls[id], browser)
  }
  const result: { [key: string]: string } = await pProps(promises)
  await browser.close()
  return result
}

async function fetchMediumArticleClapCountAsync(
  id: string,
  url: string,
  browser: puppeteer.Browser
): Promise<string> {
  console.log(`Medium: ${id}`) // eslint-disable-line no-console
  const page = await browser.newPage()
  await page.goto(url)
  const selector = '[data-test-id="post-sidebar"] [aria-label="clap"]'
  await page.waitForSelector(selector, { timeout: 10000 })
  const count = await page.$$eval(selector, function (elements) {
    let parentElement = elements[0]
    while (parentElement.children.length === 1) {
      parentElement = parentElement.parentElement
    }
    return parentElement.textContent.trim()
  })
  await page.close()
  return count
}
