let data
let pages

// Supply all route handlers with a baseline `req.context` object
module.exports = function buildContext (opts) {
  const {pagesDir, dataDir} = opts
  if (!pages) pages = require('./pages')(opts)
  if (!data) data = require('./data')(opts)

  return async function contextualize (req, res, next) {
    req.context = {
      req: {
        path: req.path
      },
      data,
      pages
    }
  
    return next()
  }
}
