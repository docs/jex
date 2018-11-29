const path = require('path')
const walk = require('walk-sync').entries
const Page = require('./page')

module.exports = function loadPages (opts) {
  const { pagesDir, pageFileFilter } = opts
  const pages = walk(pagesDir)
    .filter(pageFileFilter)
    .map(entry => new Page(entry))

  return pages
}