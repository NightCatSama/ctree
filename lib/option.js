'use strict'
var fs = require('fs')

//  default
const _default = {
  path: './src',
  img_path: './index.png',
  page_path: './dir.html',
  port: 233
}

const _map = {
  'c': 'config',
	'i': 'img_path',
  'p': 'path',
	'h': 'page_path',
	'd': 'port'
}

//  spanning ctree options
module.exports = function(_path, argv) {
	var option = _default;
	var isExist = fs.existsSync(_path)
	if (isExist) {
		var file_option = require(_path)
	}

  for (var i in _map) {
    if (argv[i]) {
      argv[_map[i]] = argv[i]
    }
  }

	return Object.assign(option, file_option, argv)
}