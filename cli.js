#!/usr/bin/env node

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const availableCommands = ['serve', 'build']
const command = args._[0]

if (!availableCommands.includes(command)) {
  console.log('TODO: write usage')
  process.exit()
}

const defaults = {
  pagesDir: 'pages',
  dataDir: 'data',
  middlewareDir: 'middleware',
  pageFileFilter: (file) => { return true },
  dataFileFilter: (file) => { return true }
}

const configFilePath = path.join(process.cwd(), 'jexpress.js')
const config = fs.existsSync(configFilePath) ? require(configFilePath) : {}

// precedence: cli args > config file > defaults
const opts = Object.assign({}, defaults, config, args)

// turn relative paths into full paths
opts.pagesDir = path.join(process.cwd(), opts.pagesDir)
opts.dataDir = path.join(process.cwd(), opts.dataDir)

// validate opts
assert(fs.existsSync(opts.pagesDir), `pages directory does not exist: ${opts.pagesDir}`)
assert(fs.existsSync(opts.dataDir), `data directory does not exist: ${opts.dataDir}`)
assert(typeof opts.pageFileFilter === 'function', `pageFileFilter must be a function`)
assert(typeof opts.dataFileFilter === 'function', `dataFileFilter must be a function`)

// execute command (delaying require() until needed for better performance)
require(`./lib/${command}`)(opts)