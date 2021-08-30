import fs from 'fs-extra'
import pProps from 'p-props'
import { join } from 'path'

import { fetchFigmaStatsAsync } from './utilities/fetch-figma-stats-async.js'
import { fetchGitHubStatsAsync } from './utilities/fetch-github-stats-async.js'
import { fetchMediumStatsAsync } from './utilities/fetch-medium-stats-async.js'
import { fetchTwitterStatsAsync } from './utilities/fetch-twitter-stats-async.js'

const dataFile = join(__dirname, '..', '..', 'data.json')

async function main(): Promise<void> {
  const promises = {
    figma: fetchFigmaStatsAsync('yuanqing'),
    github: fetchGitHubStatsAsync(
      'yuanqing',
      process.env.PERSONAL_ACCESS_TOKEN as string
    ),
    medium: fetchMediumStatsAsync({
      'Applying white space in UI design':
        'https://uxdesign.cc/whitespace-in-ui-design-44e332c8e4a?source=friends_link&sk=94e5f3b7d86965cda665f93432582fa6',
      'The Figma plugins that make me a better designer':
        'https://ux.shopify.com/the-figma-plugins-that-make-me-a-better-designer-28eb844b0506?source=friends_link&sk=e6c996958f7b9300194ca8f16e76215e',
      'The UX of Figma plugins':
        'https://uxdesign.cc/the-ux-of-figma-plugins-f4f896f8cf35?source=friends_link&sk=08a70b856568099811cb30cb24204558'
    }),
    twitter: fetchTwitterStatsAsync(
      {
        '1249707453278638080': 'figma-plugins-stats',
        '1290667904736714758': 'hci',
        '1312018444771119105': 'generate-css',
        '1340840721088036865': 'single-page-markdown-website'
      },
      process.env.TWITTER_BEARER_TOKEN as string
    )
  }
  const result = await pProps(promises)
  fs.outputFile(dataFile, JSON.stringify(result, null, 2))
}
main()
