import * as fs from 'fs-extra'
import * as globby from 'globby'
import { minify } from 'html-minifier'
import * as path from 'path'

const lodashTemplate = require('lodash.template')

const data = require('../data.json')

const sourceDirectory = path.join(__dirname, '..', 'src', 'html')
const outputDirectory = path.join(__dirname, '..', 'build')

async function main(): Promise<void> {
  const files = await globby(`${sourceDirectory}/**/*.html`)
  for (const file of files) {
    const html = await fs.readFile(file, 'utf8')
    const rendered = lodashTemplate(html)(data)
    const minified = minify(rendered, {
      collapseWhitespace: true,
      minifyJS: true,
      removeComments: true,
      removeTagWhitespace: true
    })
    const outputFilePath = path.join(
      outputDirectory,
      path.relative(sourceDirectory, file)
    )
    await fs.outputFile(outputFilePath, minified)
  }
}
main()
