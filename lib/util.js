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
		var promise = new Promise(function(res, rej) {
			fs.readdir(srcPath, function(err, files) {
				var arr, promises
				if (err) {
					reject(err)
					return
				} else {
					promises = files.map(function(file) {
						return util.getFileObj(srcPath, file, level, rules)
					})
				}
				Promise.all(promises).then(function(result) {
					res(result.filter(o => o))
				})
			})
		})
		return promise
	},
	getFileObj: function(srcPath, file, level, rules) {
		var promise = new Promise(function(res, rej) {
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
					var p = new Promise(function(resolve, reject) {
						util.getData(filePath, resolve, reject, level + 1, d)
					})
					p.then(function(arr) {
						obj.childrens = arr
						res(obj)
					})
				}
			}
			else {
				res(obj)
			}
		})
		return promise
	}
}

module.exports = util