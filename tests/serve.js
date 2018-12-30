const cheerio = require('cheerio')
const got = require('got')
const exec = require('../lib/exec')

async function get (route) {
  const { body } = await got(`http://localhost:4000${route}`)
  const $ = cheerio.load(body, { xmlMode: true })
  // $.res = Object.assign({}, res)
  return $
}

async function getJSON (route) {
  const { body } = await got(`http://localhost:4000${route}`, { json: true })
  return body
}

describe('basic example', () => {
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

describe('custom example', () => {
  let server
  beforeAll(async (done) => {
    server = exec('node cli.js serve examples/custom', done)
  })

  afterAll(async (done) => {
    await server.kill()
    done()
  })

  describe('data', () => {
    test('is ingested from JSON, YML, and YAML files', async () => {
      const { data } = await getJSON('/?json')
      const expected = {
        good_ol_json: { acronym: 'JavaScript Object Notation' },
        yaml_with_an_a: { stance: 'I spell it YAML' },
        yaml_with_no_a: { stance: 'I spell it YML' }
      }
      expect(data).toEqual(expected)
    })
  })

  test('custom default layout', async () => {
    const $ = await get('/')
    expect($.text().includes('I am a new default.')).toBe(true)
  })

  test('custom layout', async () => {
    const $ = await get('/fancy')
    expect($('body#another-layout').length).toBe(1)
  })

  // 404
  // custom 404
  // .yml data files
  // .yaml data files
  // .json data files
  // layouts have access to context
})
