const assert = require('assert')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const matter = require('gray-matter')
const renderContent = require('./render-content')

class Page {
  constructor (opts) {
    assert(opts.relativePath, 'relativePath is required')
    assert(opts.basePath, 'basePath is required')

    Object.assign(this, { ...opts })
    this.fullPath = path.join(this.basePath, this.relativePath)
    this.raw = fs.readFileSync(this.fullPath, 'utf8')
    // parse fronmatter
    const { content, data } = Page.parseFrontmatter(this.relativePath, this.raw)

    this.markdown = content
    Object.assign(this, data)
    return this
  }

  async render (context) {
    const html = await renderContent(this.markdown, context)
    return html
  }

  // wrap frontmatter parser with some error handling
  static parseFrontmatter (relativePath, markdown) {
    try {
      return matter(markdown)
    } catch (err) {
      /* istanbul ignore next */
      if (!env.test) console.error(`error parsing file: ${relativePath}`)
      throw (err)
    }
  }
}

module.exports = Page
