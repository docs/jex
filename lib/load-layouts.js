const assert = require('assert')
const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const validLayoutExtensions = ['.md', '.html']

module.exports = async function loadLayouts (opts) {
  const { layoutsDir } = opts
  const layouts = {
    default: '<html><body id="default-layout">{{ content }}</body></html>'
  }

  if (!fs.existsSync(layoutsDir)) {
    console.log('no layoutsDir:', layoutsDir)
    return layouts
  }

  walk(layoutsDir)
    .filter(entry => validLayoutExtensions.includes(path.extname(entry.relativePath)))
    .forEach(entry => {
      const key = path.basename(entry.relativePath).split('.').slice(0, -1).join('.')
      const fullPath = path.join(entry.basePath, entry.relativePath)
      const content = fs.readFileSync(fullPath, 'utf8')

      assert(/{{ ?content ?}}/mg.test(content), `layout ${entry.relativePath} does not include a reference to {{ content }}`)
      layouts[key] = content
    })

  console.log('here are the layouts', layouts)

  return Promise.resolve(layouts)
}