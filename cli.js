#!/usr/bin/env node

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const availableCommands = ['serve', 'build']
const command = args._[0]
const baseDir = args._[1] ? path.join(process.cwd(), args._[1]) : process.cwd()

if (!availableCommands.includes(command)) {
  console.log('TODO: write usage')
  process.exit()
}

const defaults = {
  pagesDir: 'pages',
  dataDir: 'data',
  layoutsDir: 'layouts',
  pageFileFilter: (file) => { return true },
  dataFileFilter: (file) => { return true }
}

const configFilePath = path.join(baseDir, 'jex.js')
const config = fs.existsSync(configFilePath) ? require(configFilePath) : {}

// precedence: cli args > config file > defaults
const opts = Object.assign({}, defaults, config, args)

// turn relative paths into full paths
opts.pagesDir = path.join(baseDir, opts.pagesDir)
opts.dataDir = path.join(baseDir, opts.dataDir)
opts.layoutsDir = path.join(baseDir, opts.layoutsDir)

// validate opts
// console.log('opts', opts)
const dirs = ['pages', 'data', 'layouts']

// warn on missing directories, but only if they have custom values from the
// config file or the CLI command
dirs.forEach(dir => {
  const dirname = `${dir}Dir`
  if (config[dirname] || args[dirname]) {
    assert(fs.existsSync(opts[dirname]), `${dir} directory does not exist: ${opts[dirname]}`)
  }
})

assert(typeof opts.pageFileFilter === 'function', `pageFileFilter must be a function`)
assert(typeof opts.dataFileFilter === 'function', `dataFileFilter must be a function`)

// execute command (delaying require() until needed for better performance)
require(`./lib/commands/${command}`)(opts)
