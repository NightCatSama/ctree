var path = require('path')
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))
var projectRoot = path.resolve(process.cwd())
var dirrc = path.normalize(path.join(projectRoot, argv.c || argv.config || './.dirrc.js'))
var option = require('./option.js')(dirrc, argv)
var srcPath = path.normalize(path.join(projectRoot, option.path))

module.exports = {
	option: option,
	projectRoot: path.normalize(projectRoot),
	srcPath: srcPath,
	srcRoot: path.normalize(path.relative(projectRoot, srcPath)),
	kinds: option._,
	log: option._.indexOf('log') > -1,
	txt: option._.indexOf('txt') > -1,
	img: option._.indexOf('img') > -1,
	page: option._.indexOf('page') > -1,
	server: option._.indexOf('server') > -1
}