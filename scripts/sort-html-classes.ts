import fs from 'node:fs/promises'

import { globby } from 'globby'

const prefixes = ['md', 'lg', 'xl', 'selection']

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const globPattern = args[0]
  const files = await globby(globPattern)
  for (const file of files) {
    const html = await fs.readFile(file, 'utf8')
    const result = html.replace(
      /class="([^"]+)"/g,
      function (_: string, classes: string) {
        return `class="${classes
          .split(/ +/)
          .sort(sortClasses)
          .join(' ')
          .trim()}"`
      }
    )
    await fs.writeFile(file, result)
  }
}
main()

function sortClasses(x: string, y: string): number {
  if (isComponent(x) === true) {
    if (isComponent(y) === true) {
      return x.localeCompare(y)
    }
    return -1
  }
  if (isComponent(y) === true) {
    return 1
  }
  if (hasPrefix(x) === true) {
    if (hasPrefix(y) === true) {
      const xx = parsePrefixedClassName(x)
      const yy = parsePrefixedClassName(y)
      if (xx.prefix === yy.prefix) {
        return sortClasses(
          stripDashPrefix(xx.className),
          stripDashPrefix(yy.className)
        )
      }
      return prefixes.indexOf(xx.prefix) - prefixes.indexOf(yy.prefix)
    }
    return 1
  }
  if (hasPrefix(y) === true) {
    return -1
  }
  return stripDashPrefix(x).localeCompare(stripDashPrefix(y))
}

function isComponent(className: string): boolean {
  return /[A-Z]/.test(className) === true
}

function hasPrefix(className: string): boolean {
  for (const prefix of prefixes) {
    if (className.indexOf(`${prefix}:`) === 0) {
      return true
    }
  }
  return false
}

function parsePrefixedClassName(className: string): {
  className: string
  prefix: string
} {
  const index = className.indexOf(':')
  if (index === -1) {
    throw new Error()
  }
  return {
    className: className.substring(index + 1),
    prefix: className.substring(0, index)
  }
}

function stripDashPrefix(className: string) {
  if (className[0] === '-') {
    return className.substring(1)
  }
  return className
}
