const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const yaml = require('js-yaml')
const flat = require('flat')
const { difference, get, set } = require('lodash')
const pathSeparator = new RegExp(path.sep, 'g')

module.exports = function loadData (opts) {
  const {dataDir, dataFileFilter } = opts
  
  // start with an empty data object
  const data = {}

  // find YML files in the given directory (recursively)
  walk(dataDir)
    .filter(dataFileFilter)
    .forEach(entry => {
      // derive `foo.bar.baz` object key from `foo/bar/baz.yml` filename
      const key = entry.relativePath
        .replace('.yml', '')
        .replace(pathSeparator, '.')

      // parse the file
      const fullPath = path.join(entry.basePath, entry.relativePath)
      const fileData = yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'))

      // add this file's data to the global data object
      set(data, key, fileData)
    })

  return data
}