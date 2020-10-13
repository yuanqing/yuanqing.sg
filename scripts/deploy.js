const vinylFs = require('vinyl-fs')
const VinylFtp = require('vinyl-ftp')

function main () {
  const connection = new VinylFtp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    parallel: 10,
    log: console.log
  })
  vinylFs
    .src(['./build/**'], {
      base: './build',
      buffer: false,
      dot: false
    })
    .pipe(connection.dest(process.env.FTP_DIRECTORY))
}
main()
