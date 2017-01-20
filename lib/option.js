'use strict'
var fs = require('fs')

//  default
const _default = {
	path: './src',
	ignore: ['node_modules/', '.git/'],
	limit: 0,
	port: 8080
}

const _map = {
	'v': 'version',
	'c': 'config',
	'l': 'limit',
	'p': 'path',
	'o': 'output',
	'g': 'ignore',
	'd': 'port'
}

//  spanning ctree options
module.exports = function(_path, argv) {
	var option = _default
	var isExist = fs.existsSync(_path)
	if (isExist) {
		var file_option = require(_path)
	}

	for (var i in _map) {
		if (argv[i]) {
			argv[_map[i]] = argv[i]
		}
	}

	if (typeof argv['ignore'] === 'string') {
		argv['ignore'] = eval(argv['ignore'])
	}

	return Object.assign(option, file_option, argv)
}