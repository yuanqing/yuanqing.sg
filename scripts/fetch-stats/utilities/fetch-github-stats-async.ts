import { Octokit } from '@octokit/rest'

import { formatNumber } from './format-number.js'

export async function fetchGitHubStatsAsync(
  username: string,
  accessToken: string
): Promise<Record<string, string>> {
  console.log('GitHub') // eslint-disable-line no-console
  const octokit = new Octokit({
    auth: accessToken,
    userAgent: username
  })
  const data = await octokit.paginate(octokit.repos.listForUser, {
    type: 'owner',
    username: username
  })
  const result: Record<string, string> = {}
  for (const { name, stargazers_count } of data) {
    result[name] = formatNumber(stargazers_count as number)
  }
  return result
}
