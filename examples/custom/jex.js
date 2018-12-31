module.exports = {
  afterPageInitialized: (page) => {
    if (page.relativePath.endsWith('fancy.md')) {
      page.permalinks.push('/fancy-customized-at-runtime-permalink')
    }
  },
  afterContext: (req, res, next) => {
    req.context.modifiedByMiddleware = true
    next()
  },
  beforeRender: (req, res, next) => {
    if (req.context.page) {
      req.context.page.modifiedByMiddleware = true
    }
    next()
  }
}
