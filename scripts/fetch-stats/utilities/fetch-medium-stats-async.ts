import pProps from 'p-props'
import puppeteer from 'puppeteer'

export async function fetchMediumStatsAsync(
  urls: Record<string, string>
): Promise<Record<string, string>> {
  const browser = await puppeteer.launch()
  const promises: Record<string, Promise<string>> = {}
  for (const id in urls) {
    promises[id] = fetchMediumArticleClapCountAsync(id, urls[id], browser)
  }
  const result: Record<string, string> = await pProps(promises)
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
  const count = await page.$$eval(
    selector,
    function (elements: Array<Element>) {
      let parentElement: Element = elements[0]
      while (parentElement.children.length === 1) {
        if (parentElement.parentElement === null) {
          throw new Error('`parentElement.parentElement` is `null`')
        }
        parentElement = parentElement.parentElement
      }
      if (parentElement.textContent === null) {
        throw new Error('`parentElement.textContent` is `null`')
      }
      return parentElement.textContent.trim()
    }
  )
  await page.close()
  return count
}
