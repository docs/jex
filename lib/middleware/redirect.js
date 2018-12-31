let redirects

module.exports = function redirect (req, res, next) {
  // on first request...
  if (!redirects) {
    redirects = {}
    // gather redirects from all pages into a key-value object
    // so the server can quickly find and route to them
    req.context.pages.forEach(page => {
      Object.assign(redirects, page.redirects)
    })
    // attach all redirects to context for testing purposes
    req.context.redirects = redirects
  }

  const redirect = redirects[req.path]
  return redirect ? res.redirect(301, redirect) : next()
}
