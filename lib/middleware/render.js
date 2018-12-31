const assert = require('assert')
const { get } = require('lodash')
const liquid = require('../liquid')

module.exports = async function render (req, res, next) {
  const { page } = req.context

  if (!page) return res.status(404).send(`page not found: ${req.path}`)

  // render page
  req.context.content = await page.render(req.context)

  // `?json` query param for debugging request context
  if ('json' in req.query) {
    if (req.query.json.length > 1) {
      // deep reference: ?json=page.permalinks
      return res.json(get(req.context, req.query.json))
    } else {
      // the whole enchilada: ?json
      return res.json(req.context)
    }
  }

  // choose layout
  const layout = req.context.layouts[page.layout || 'default']
  assert(layout, `page ${page.relativePath} has a nonexistent layout: ${page.layout}`)

  // TODO change this to `renderContent`
  const output = await liquid.parseAndRender(layout, req.context)

  res.send(output)
}
