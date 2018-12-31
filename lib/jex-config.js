const assert = require('assert')
const fs = require('fs')
const path = require('path')

const defaults = {
  pagesDir: 'pages',
  dataDir: 'data',
  layoutsDir: 'layouts',
  pageFileFilter: (file) => { return true },
  dataFileFilter: (file) => { return true },
  afterPageInitialized: (page) => { return page },
  afterContextualize: (req, res, next) => { return next() },
  beforeRender: (req, res, next) => { return next() }
}

module.exports = function buildJexConfig (args) {
  // baseDir defaults to process.cwd(), or can be specified as the first
  // positional argument after `$ jex serve`
  const baseDir = args._[1] ? path.join(process.cwd(), args._[1]) : process.cwd()
  const configFilePath = path.join(baseDir, 'jex.js')
  const configFile = fs.existsSync(configFilePath) ? require(configFilePath) : {}

  // precedence: cli args > config file > defaults
  const config = Object.assign({}, defaults, configFile, args)

  // turn relative paths into full paths
  config.pagesDir = path.join(baseDir, config.pagesDir)
  config.dataDir = path.join(baseDir, config.dataDir)
  config.layoutsDir = path.join(baseDir, config.layoutsDir)

  // validate
  assert(typeof config.pageFileFilter === 'function', `pageFileFilter must be a function`)
  assert(typeof config.dataFileFilter === 'function', `dataFileFilter must be a function`)

  // pages directory must always exist
  assert(fs.existsSync(config.pagesDir), `pages directory does not exist: ${config.pagesDir}`)

  // verify data directory exists, but only if it has a non-default value
  if (configFile.dataDir || args.dataDir) {
    assert(fs.existsSync(config.dataDir), `data directory does not exist: ${config.dataDir}`)
  }

  // verify data directory exists, but only if it has a non-default value
  if (configFile.layoutsDir || args.layoutsDir) {
    assert(fs.existsSync(config.layoutsDir), `layouts directory does not exist: ${config.layoutsDir}`)
  }

  return config
}
