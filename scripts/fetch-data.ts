import { Octokit } from '@octokit/rest'
import * as fs from 'fs-extra'

const fetch = require('isomorphic-unfetch')

async function main(): Promise<void> {
  const figma = await fetchFigmaStatsAsync('yuanqing')
  const github = await fetchGitHubStatsAsync(
    'yuanqing',
    process.env.GITHUB_ACCESS_TOKEN as string
  )
  await fs.outputFile(
    'data.json',
    JSON.stringify({ figma, github }, null, 2),
    'utf8'
  )
}
main()

export async function fetchFigmaStatsAsync(
  username: string
): Promise<{ [key: string]: string }> {
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

export async function fetchGitHubStatsAsync(
  username: string,
  accessToken: string
): Promise<{ [key: string]: string }> {
  const octokit = new Octokit({
    auth: accessToken,
    userAgent: username
  })
  const data = await octokit.paginate(octokit.repos.listForUser, {
    type: 'owner',
    username: username
  })
  const result: { [key: string]: string } = {}
  for (const { name, stargazers_count } of data) {
    result[name] = formatNumber(stargazers_count as number)
  }
  return result
}

function formatNumber(number: number): string {
  return Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    minimumFractionDigits: number > 999 && number < 100000 ? 1 : 0,
    notation: 'compact'
  } as Intl.NumberFormatOptions)
    .format(number)
    .replace('.0', '')
}
