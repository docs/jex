const liquid = require('./liquid')
const hubdown = require('hubdown')

// parse multiple times because some templates contain more templates. :]
module.exports = async function renderContent (markdown, context) {
  markdown = await liquid.parseAndRender(markdown, context)
  markdown = await liquid.parseAndRender(markdown, context)
  markdown = await liquid.parseAndRender(markdown, context)
  const { content: html } = await hubdown(markdown)
  return html
}
