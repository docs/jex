const walk = require('walk-sync').entries
const Page = require('./page')

module.exports = function loadPages (opts) {
  const { pagesDir, pageFileFilter } = opts
  const pages = walk(pagesDir)
    .filter(pageFileFilter)
    .map(entry => new Page(entry))

  // add named keys to the array for fast object-like URL reference
  for (const page of pages) {
    page.permalinks.forEach(permalink => {
      pages[permalink] = page
    })
  }

  return pages
}
