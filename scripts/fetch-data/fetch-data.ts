import * as fs from 'fs-extra'

import { fetchFigmaStatsAsync } from './utilities/fetch-figma-stats-async'
import { fetchGitHubStatsAsync } from './utilities/fetch-github-stats-async'
import { fetchLinkedInStatsAsync } from './utilities/fetch-linkedin-stats-async'
import { fetchMediumStatsAsync } from './utilities/fetch-medium-stats-async'
import { fetchTwitterStatsAsync } from './utilities/fetch-twitter-stats-async'

async function main(): Promise<void> {
  const figma = await fetchFigmaStatsAsync('yuanqing')
  const github = await fetchGitHubStatsAsync(
    'yuanqing',
    process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string
  )
  const linkedIn = await fetchLinkedInStatsAsync({
    'Meaningful career advice':
      'https://linkedin.com/posts/yuan-qing-lim_at-work-this-week-i-filled-out-a-questionnaire-activity-6657097115879202816-ly0X/'
  })
  const medium = await fetchMediumStatsAsync({
    'Applying white space in UI design':
      'https://uxdesign.cc/whitespace-in-ui-design-44e332c8e4a?source=friends_link&sk=94e5f3b7d86965cda665f93432582fa6',
    'The UX of Figma plugins':
      'https://uxdesign.cc/the-ux-of-figma-plugins-f4f896f8cf35?source=friends_link&sk=08a70b856568099811cb30cb24204558'
  })
  const twitter = await fetchTwitterStatsAsync(
    {
      '1249707453278638080': 'figma-plugins-stats',
      '1290667904736714758': 'hci',
      '1312018444771119105': 'generate-css',
      '1340840721088036865': 'single-page-markdown-website'
    },
    process.env.TWITTER_BEARER_TOKEN as string
  )
  await fs.outputFile(
    'data.json',
    JSON.stringify({ figma, github, linkedIn, medium, twitter }, null, 2),
    'utf8'
  )
}
main()
