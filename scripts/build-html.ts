import fs from 'fs-extra'
import globby from 'globby'
import { minify } from 'html-minifier'
import lodashTemplate from 'lodash.template'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const statsFile = path.join(__dirname, '..', 'stats.json')
const sourceDirectory = path.join(__dirname, '..', 'src', 'html')
const outputDirectory = path.join(__dirname, '..', 'build')

async function main(): Promise<void> {
  const stats = JSON.parse(await fs.readFile(statsFile, 'utf8'))
  const files = await globby(`${sourceDirectory}/**/*.html`)
  for (const file of files) {
    const html = await fs.readFile(file, 'utf8')
    const rendered = lodashTemplate(html)(stats)
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
