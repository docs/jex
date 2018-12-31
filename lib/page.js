const assert = require('assert')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const renderContent = require('./render-content')
const trailingSlash = /^(.+?)\/+?$/

class Page {
  constructor (fileData, jexConfig) {
    assert(fileData.relativePath, 'relativePath is required')
    assert(fileData.basePath, 'basePath is required')

    Object.assign(this, { ...fileData })
    this.fullPath = path.join(this.basePath, this.relativePath)
    this.markdown = fs.readFileSync(this.fullPath, 'utf8')
    // parse fronmatter
    const { content, data } = Page.parseFrontmatter(this.relativePath, this.markdown)

    this.markdown = content
    Object.assign(this, data)

    // allow permalinks to be specified in frontmatter,
    // or create a default based on filename
    this.permalinks = this.permalinks || [this.constructor.relativePathToSuffix(this.relativePath)]

    // convert redirects array into an object, where key is the old URL,
    // and value is new URL (the page's first permalink)
    this.redirects = (this.redirects || [])
      .reduce((acc, next) => {
        acc[next] = this.permalinks[0]
        return acc
      }, {})

    // allow page object to be modified
    jexConfig.afterPageInitialized(this)

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
