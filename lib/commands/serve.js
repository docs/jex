const port = Number(process.env.PORT) || 4000
const express = require('express')

module.exports = async function serve (jexConfig) {
  const middleware = [
    (await require('../middleware/contextualize')(jexConfig)),
    jexConfig.afterContextualize,
    require('../middleware/redirect'),
    jexConfig.beforeRender,
    require('../middleware/render')
  ]

  const app = express()
  app.use(middleware)
  app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
  })
}
