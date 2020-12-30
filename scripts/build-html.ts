import * as fs from 'fs-extra'
import * as globby from 'globby'
import * as path from 'path'

const lodashTemplate = require('lodash.template')

const data = require('../data.json')

const sourceDirectory = path.join(__dirname, '..', 'src', 'html')
const outputDirectory = path.join(__dirname, '..', 'build')

async function main(): Promise<void> {
  const files = await globby(`${sourceDirectory}/**/*.html`)
  for (const file of files) {
    const html = await fs.readFile(file, 'utf8')
    const result = lodashTemplate(html)(data)
    const outputFilePath = path.join(
      outputDirectory,
      path.relative(sourceDirectory, file)
    )
    await fs.outputFile(outputFilePath, result)
  }
  // const figma = await fetchFigmaStatsAsync('yuanqing')
  // const github = await fetchGitHubStatsAsync(
  //   'yuanqing',
  //   process.env.GITHUB_ACCESS_TOKEN as string
  // )
  // await fs.outputFile('data.json', JSON.stringify({ figma, github }, null, 2), 'utf8')
}
main()
