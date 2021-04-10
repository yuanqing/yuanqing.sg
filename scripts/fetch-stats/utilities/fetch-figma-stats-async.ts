const fetch = require('isomorphic-unfetch')

import { formatNumber } from './format-number'

export async function fetchFigmaStatsAsync(
  username: string
): Promise<{ [key: string]: string }> {
  console.log('Figma') // eslint-disable-line no-console
  const response = await fetch(
    'https://yuanqing.github.io/figma-plugins-stats/index.json'
  )
  const data = await response.json()
  const result: { [key: string]: string } = {}
  for (const { name, installCount, publisherHandle } of data.plugins) {
    if (publisherHandle === username) {
      result[name] = formatNumber(installCount)
    }
  }
  return result
}
