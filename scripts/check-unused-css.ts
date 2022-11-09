import { default as purifyCss } from 'purify-css'

function main(): void {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    throw new Error('Need glob for HTML and a glob for CSS')
  }
  const html = [args[0]]
  const css = [args[1]]
  const output: Array<string> = []
  // eslint-disable-next-line no-console
  console.log = function (...args: Array<any>) {
    output.push(args.join(' '))
  }
  purifyCss(html, css, {
    rejected: true
  })
  if (output.length > 0) {
    throw new Error(`Unused CSS\n${output.join('')}`)
  }
}
main()
