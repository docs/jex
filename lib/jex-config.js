const assert = require('assert')
const fs = require('fs')
const path = require('path')

const defaults = {
  pagesDirectory: 'pages',
  pagesIncludePatterns: ['**/*.md', '**/*.markdown', '**/*.html'],
  pagesExcludePatterns: ['**/node_modules/**', '**/vendor/**'],

  dataDirectory: 'data',
  dataIncludePatterns: ['**/*.json', '**/*.yaml', '**/*.yml'],
  dataExcludePatterns: ['**/node_modules/**', '**/vendor/**'],

  layoutsDirectory: 'layouts',
  layoutsIncludePatterns: ['**/*.md', '**/*.markdown', '**/*.html'],
  layoutsExcludePatterns: ['**/node_modules/**', '**/vendor/**'],

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
  config.pagesDirectory = path.join(baseDir, config.pagesDirectory)
  config.dataDirectory = path.join(baseDir, config.dataDirectory)
  config.layoutsDirectory = path.join(baseDir, config.layoutsDirectory)

  // validate
  assert(Array.isArray(config.pagesIncludePatterns), `pagesIncludePatterns must be an array of globs or minimatch patterns`)
  assert(Array.isArray(config.dataIncludePatterns), `dataIncludePatterns must be an array of globs or minimatch patterns`)
  assert(Array.isArray(config.layoutsIncludePatterns), `layoutsIncludePatterns must be an array of globs or minimatch patterns`)

  assert(Array.isArray(config.pagesExcludePatterns), `pagesExcludePatterns must be an array of globs or minimatch patterns`)
  assert(Array.isArray(config.dataExcludePatterns), `dataExcludePatterns must be an array of globs or minimatch patterns`)
  assert(Array.isArray(config.layoutsExcludePatterns), `layoutsExcludePatterns must be an array of globs or minimatch patterns`)

  // pages directory must always exist
  assert(fs.existsSync(config.pagesDirectory), `pages directory does not exist: ${config.pagesDirectory}`)

  // verify data directory exists, but only if it has a non-default value
  if (configFile.dataDirectory || args.dataDirectory) {
    assert(fs.existsSync(config.dataDirectory), `data directory does not exist: ${config.dataDirectory}`)
  }

  // verify data directory exists, but only if it has a non-default value
  if (configFile.layoutsDirectory || args.layoutsDirectory) {
    assert(fs.existsSync(config.layoutsDirectory), `layouts directory does not exist: ${config.layoutsDirectory}`)
  }

  return config
}
