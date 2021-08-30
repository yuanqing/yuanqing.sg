import fs from 'fs-extra'
import { globby } from 'globby'
import { minify } from 'html-minifier'
import lodashTemplate from 'lodash.template'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = join(__dirname, '..', 'data.json')
const sourceDirectory = join(__dirname, '..', 'src', 'html')
const outputDirectory = join(__dirname, '..', 'build')

async function main(): Promise<void> {
  const data = (await fs.pathExists(dataFile))
    ? JSON.parse(await fs.readFile(dataFile, 'utf8'))
    : {}
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
    const outputFilePath = join(
      outputDirectory,
      relative(sourceDirectory, file)
    )
    await fs.outputFile(outputFilePath, minified)
  }
}
main()
