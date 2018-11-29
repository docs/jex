const fs = require('fs')
const path = require('path')
const { get } = require('lodash')
const liquid = require('./liquid')
// const layout = fs.readFileSync(path.join(__dirname, '../layouts/main.html'), 'utf8')
const Page = require('./page')

module.exports = async function renderPage (req, res, next) {
  return res.json(req.context)

  // pages is an Array, but has permalinks as keys for fast access
  const page = req.context.pages[req.path]

  // TODO render a 404 page
  if (!page) return res.status(404).send(`page not found: ${req.path}`)

  // add page context
  const context = Object.assign({}, req.context, { page })

  // render page
  context.content = await page.render(context)

  // `?json` query param for debugging request context
  if ('json' in req.query) {
    if (req.query.json.length > 1) {
      // deep reference: ?json=page.permalinks
      return res.json(get(context, req.query.json))
    } else {
      // the whole enchilada: ?json
      return res.json(context)
    }
  }

  const output = await liquid.parseAndRender(layout, context)

  res.send(output)
}