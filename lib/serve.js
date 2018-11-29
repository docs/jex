const port = Number(process.env.PORT) || 4000
const express = require('express')
const middleware = {
  context: require('./context'),
  renderPage: require('./render-page')
}

module.exports = async function serve (opts = {}) {
  console.log('I am here to serve')
  const app = express()
  app.use(middleware.context(opts))
  app.get('/*', middleware.renderPage)

  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
  })
}