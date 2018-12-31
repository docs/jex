const port = Number(process.env.PORT) || 4000
const express = require('express')

module.exports = async function serve (opts = {}) {
  const middleware = [
    (await require('../middleware/context')(opts)),
    (opts.afterContext || noop),

    (opts.beforeRender || noop),
    require('../middleware/render')
  ]

  const app = express()
  app.use(middleware)
  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
  })
}

function noop (req, res, next) { return next() }
