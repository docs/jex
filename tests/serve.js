const cheerio = require('cheerio')
const got = require('got')
const exec = require('../lib/exec')

async function get (route) {
  const { body } = await got(`http://localhost:4000${route}`)
  const $ = cheerio.load(body, { xmlMode: true })
  // $.res = Object.assign({}, res)
  return $
}

describe('serve', () => {
  let server
  beforeAll(async (done) => {
    server = exec('node cli.js serve examples/basic', done)
  })

  afterAll(async (done) => {
    await server.kill()
    done()
  })

  test('data references', async () => {
    const $ = await get('/hello')
    expect($.text().includes('The meaning of life is 42')).toBe(true)
  })

  test('default layout', async () => {
    const $ = await get('/hello')
    expect($('body#default-layout').length).toBe(1)
  })
})
