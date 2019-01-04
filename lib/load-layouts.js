const assert = require('assert')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const validLayoutExtensions = ['.md', '.html']

module.exports = async function loadLayouts (jexConfig) {
  const { layoutsDirectory, layoutsIncludePatterns: globs, layoutsExcludePatterns: ignore } = jexConfig

  const layouts = {
    default: '<html><body id="default-layout">{{ content }}</body></html>'
  }

  // return default internal layout if none are specified
  if (!fs.existsSync(layoutsDirectory)) return layouts

  // find YML files in the given directory (recursively)
  walk(layoutsDirectory, { globs, ignore, directories: false })
    .filter(entry => validLayoutExtensions.includes(path.extname(entry.relativePath)))
    .forEach(entry => {
      const key = path.basename(entry.relativePath).split('.').slice(0, -1).join('.')
      const fullPath = path.join(entry.basePath, entry.relativePath)
      const content = fs.readFileSync(fullPath, 'utf8')

      assert(/{{ ?content ?}}/mg.test(content), `layout ${entry.relativePath} does not include a reference to {{ content }}`)
      layouts[key] = content
    })

  return Promise.resolve(layouts)
}
