const fs = require('fs')
const path = require('path')
const walk = require('walk-sync').entries
const yaml = require('js-yaml')
const { set } = require('lodash')
const pathSeparator = new RegExp(path.sep, 'g')

module.exports = function loadData (jexConfig) {
  const { dataDirectory, dataIncludePatterns: globs, dataExcludePatterns: ignore } = jexConfig

  // start with an empty data object
  const data = {}

  // find YML files in the given directory (recursively)
  walk(dataDirectory, { globs, ignore, directories: false })
    .forEach(entry => {
      const fullPath = path.join(entry.basePath, entry.relativePath)
      const extension = path.extname(entry.relativePath)

      // JSON or YML?
      const fileData = extension === 'json'
        ? require(fullPath)
        : parseYAML(fullPath)

      // derive `foo.bar.baz` object key from `foo/bar/baz.yml` filename
      const key = entry.relativePath
        .replace('.yml', '')
        .replace('.yaml', '')
        .replace('.json', '')
        .replace(pathSeparator, '.')

      // add this file's data to the global data object
      set(data, key, fileData)
    })

  return data
}

function parseYAML (fullPath) {
  try {
    return yaml.safeLoad(fs.readFileSync(fullPath, 'utf8'))
  } catch (err) {
    console.error('trouble parsing YAML file: ', fullPath)
    console.error(err)
  }
}
