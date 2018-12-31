module.exports = {
  afterContext: (req, res, next) => {
    req.context.modifiedByMiddleware = true
    next()
  },
  beforeRender: (req, res, next) => {
    req.context.page.modifiedByMiddleware = true
    next()
  }
}
