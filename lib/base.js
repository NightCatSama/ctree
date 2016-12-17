var path = require('path')
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))
var projectRoot = path.resolve(process.cwd())
var dirrc = path.join(projectRoot, argv.c || argv.config || './.dirrc.js')
var option = require('./option.js')(dirrc, argv)

module.exports = {
  option: option,
  projectRoot: projectRoot,
  srcPath: path.join(projectRoot, option.path),
  kinds: option._,
  log: option._.indexOf('log') > -1,
  img: option._.indexOf('img') > -1,
  page: option._.indexOf('page') > -1,
  server: option._.indexOf('server') > -1
}