const port = Number(process.env.PORT) || 4000
const express = require('express')

module.exports = async function serve (opts = {}) {
  console.log('I am here to serve')

  const middleware = [
    (opts.beforeContext || noop),
    (await require('../middleware/context')(opts)),
    (opts.afterContext || noop),

    (opts.beforeRenderPage || noop),
    require('../middleware/render-page')
  ]

  const app = express()
  app.use(middleware)
  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
  })
}

function noop (req, res, next) { return next() }
