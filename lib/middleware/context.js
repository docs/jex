let pages, data, layouts

// Supply all route handlers with a baseline `req.context` object
module.exports = async function buildContext (opts) {
  if (!pages) pages = await require('../load-pages')(opts)
  if (!data) data = await require('../load-data')(opts)
  if (!layouts) layouts = await require('../load-layouts')(opts)

  return async function contextualize (req, res, next) {
    // pages is an Array, but has permalinks as keys for fast access
    const page = pages[req.path]

    req.context = {
      req: {
        path: req.path
      },
      data,
      page,
      pages,
      layouts
    }

    return next()
  }
}
