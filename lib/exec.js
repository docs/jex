// helper for server tests

const { spawn } = require('child_process')
const { promisify } = require('util')
const kill = promisify(require('tree-kill'))

module.exports = function exec (cmd, done) {
  cmd = cmd.split(' ')
  const server = spawn(cmd[0], cmd.slice(1))

  server.stdout.on('data', (stdout) => {
    // process.stdout.write(stdout) // (for debugging)
    if (stdout.includes('app running')) done()
  })

  server.stderr.on('data', (stderr) => {
    console.log(`stderr: ${stderr}`)
  })

  server.kill = async () => {
    await kill(server.pid)
  }

  return server
}
