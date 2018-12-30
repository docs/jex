let pages, data, layouts

// Supply all route handlers with a baseline `req.context` object
module.exports = async function buildContext (opts) {
  if (!pages) pages = await require('../load-pages')(opts)
  if (!data) data = await require('../load-data')(opts)
  if (!layouts) layouts = await require('../load-layouts')(opts)

  return async function contextualize (req, res, next) {
    req.context = {
      req: {
        path: req.path
      },
      data,
      pages,
      layouts
    }

    return next()
  }
}
