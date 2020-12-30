const ghpages = require('gh-pages')

ghpages.publish(
  'build',
  {
    repo: `https://${process.env.PERSONAL_ACCESS_TOKEN}@github.com/yuanqing/yuanqing.sg.git`
  },
  function (error: Error) {
    if (error) {
      throw error
    }
    console.log('Published') // eslint-disable-line no-console
  }
)
