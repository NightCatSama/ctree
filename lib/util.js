var fs = require('fs')
var path = require('path')
var base = require('./base.js')
var ignore = require('./ignore.js')

var isIgnore = ignore.isIgnore
var isGlobalIgnore = ignore.isGlobalIgnore
var projectRoot = base.projectRoot
var srcPath = base.srcPath

var util = {
	getData: function(srcPath, resolve, reject, level, rules) {
		util.readDirToArray(srcPath, reject, level, rules)
		.then(arr => resolve(arr))
		.catch(err => console.log(err.red))
	},
	readDirToArray: function(srcPath, reject, level, rules) {
		return new Promise(function(res, rej) {
			fs.readdir(srcPath, function(err, files) {
				var arr, promises
				if (err) {
					reject(err)
					return
				} else {
					promises = files.map(file => util.getFileObj(srcPath, file, level, rules))
				}
				Promise.all(promises)
				.then(result => res(result.filter(o => o)))
			})
		})
	},
	getFileObj: function(srcPath, file, level, rules) {
		return new Promise(function(res, rej) {
			var filePath = path.normalize(path.join(srcPath, file))
			var stat = fs.statSync(filePath)
			var obj = new Object()
			obj.size = stat.size
			obj.name = file
			obj.path = filePath
			obj.ctime = stat.ctime
			var ext = path.extname(file)
			obj.ext = ext && ext.substr(1)
			obj.relativePath = path.normalize(path.relative(projectRoot, filePath))
			obj.isDirectory = stat.isDirectory()
			var d = rules ? isIgnore(obj, rules) : isGlobalIgnore(obj)
			if (d === true) {
				res(false)
			}
			else if (obj.isDirectory) {
				if (base.option.limit && level >= base.option.limit) {
					obj.childrens = []
					res(obj)
				}
				else {
					new Promise((resolve, reject) => util.getData(filePath, resolve, reject, level + 1, d))
					.then(function(arr) {
						obj.childrens = arr
						res(obj)
					})
				}
			}
			else {
				res(obj)
			}
		})
	}
}

module.exports = util