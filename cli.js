#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))
const availableCommands = ['serve', 'build']
const command = args._[0]

if (!availableCommands.includes(command)) {
  console.log('')
  console.log('  Usage')
  console.log('')
  console.log('$ jex serve')
  console.log('$ jex serve <basedir>')
  process.exit()
}

const jexConfig = require('./lib/jex-config')(args)

// execute command (delaying require() until needed for better performance)
require(`./lib/commands/${command}`)(jexConfig)
