#!/usr/bin/env node

var fs = require('fs')
global.colors = require('colors')
var base = require('../lib/base.js')
var util = require('../lib/util.js')
var ignore = require('../lib/ignore.js')

var rules = ignore.rules
var kinds = base.kinds
var srcPath = base.srcPath

/*  get Array of directory tree structure  */
function getTreeData() {
	new Promise((resolve, reject) => {
			util.getData(srcPath, resolve, reject, 1, rules)
		})
		.then(arr => start(arr))
		.catch(err => console.error(err))
}

base.option.help && help()

/*  According to the user's parameters corresponding to different operation  */
function start(arr) {
	if (base.option.version) {
		return printVersion()
	}
	else if (kinds.length === 0) {
		base.log = true
		require('../lib/log.js')(arr)
	}
	else {
		var log_kinds = ['log', 'txt']
		var isLog = log_kinds.some(kind => kinds.indexOf(kind) > -1)
		isLog && require('../lib/log.js')(arr)

		var server_kinds = ['img', 'server', 'page']
		var isServer = server_kinds.some(kind => kinds.indexOf(kind) > -1)
		isServer && require('../lib/server.js')(arr)

		!isLog && !isServer && help(true)
	}
}

/*  print versition  */
function printVersion() {
	console.log(require('../package.json').version)
}

/*  print help doc  */
function help(isErr) {
	isErr && console.log(' Command is not fount, Please enter the correct order.'.red)
	console.log(' For examples:')
	console.log()
	console.log('    # Print the directory structure to the shell, this is default'.gray)
	console.log('    $ ctree -p ./src')
	console.log()
	console.log('    # According to the directory structure to generate a txt file'.gray)
	console.log('    $ ctree txt -p ./src -o ctree.txt')
	console.log()
	console.log('    # According to the directory structure to generate an image file'.gray)
	console.log('    $ ctree img -p ./src -o ctree.jpg')
	console.log()
	console.log('    # Open the local server to view tree'.gray)
	console.log('    $ ctree server -p ./src -d 233')
	console.log()
	console.log('    # According to the directory structure to generate a page'.gray)
	console.log('    $ ctree page -p ./src -o ctree.html')
	console.log()
}

getTreeData();