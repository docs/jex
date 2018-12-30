const assert = require('assert')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const renderContent = require('./render-content')
const trailingSlash = /^(.+?)\/+?$/

class Page {
  constructor (opts) {
    assert(opts.relativePath, 'relativePath is required')
    assert(opts.basePath, 'basePath is required')

    Object.assign(this, { ...opts })
    this.fullPath = path.join(this.basePath, this.relativePath)
    this.markdown = fs.readFileSync(this.fullPath, 'utf8')
    // parse fronmatter
    const { content, data } = Page.parseFrontmatter(this.relativePath, this.markdown)

    this.markdown = content
    Object.assign(this, data)

    //
    this.permalinks = opts.createPermalinks
      ? opts.createPermalinks(this)
      : [this.constructor.relativePathToSuffix(this.relativePath)]

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
      throw (err)
    }
  }

  static relativePathToSuffix (relativePath) {
    return '/' + relativePath
      .replace('index.md', '')
      .replace('.md', '')
      .replace(trailingSlash, '$1')
  }
}

module.exports = Page
