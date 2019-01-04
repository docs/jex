const walk = require('walk-sync').entries
const Page = require('./page')

module.exports = function loadPages (jexConfig) {
  const { pagesDirectory, pagesIncludePatterns: globs, pagesExcludePatterns: ignore } = jexConfig

  const pages = walk(pagesDirectory, { globs, ignore, directories: false })
    .map(entry => new Page(entry, jexConfig))

  // add named keys to the array for fast object-like URL reference
  for (const page of pages) {
    page.permalinks.forEach(permalink => {
      pages[permalink] = page
    })
  }

  return pages
}
