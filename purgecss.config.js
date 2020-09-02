module.exports = {
  content: ['src/**/*.html'],
  css: ['build/**/*.css'],
  defaultExtractor: function (content) {
    return content.match(/[A-Za-z0-9-_:/]+/g)
  }
}
