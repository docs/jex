let pages, data, layouts
const { pick } = require('lodash')

// Supply all route handlers with a baseline `req.context` object
module.exports = async function contextualize (jexConfig) {
  if (!pages) pages = await require('../load-pages')(jexConfig)
  if (!data) data = await require('../load-data')(jexConfig)
  if (!layouts) layouts = await require('../load-layouts')(jexConfig)

  return async function contextualize (req, res, next) {
    // pages is an Array, but has permalinks as keys for fast access
    const page = pages[req.path]

    req.context = {
      request: pick(req, ['method', 'path', 'headers', 'query']),
      data,
      page,
      pages,
      layouts
    }

    return next()
  }
}
