var fs = require('fs')
var path = require('path')
var base = require('./base.js')
var projectRoot = base.projectRoot
var srcPath = base.srcPath

var util = {
	getData: function(srcPath, resolve, reject) {
		var promise = util.readDirToArray(srcPath, reject);
		promise.then(function(arr) {
			resolve(arr)
		})
	},
	readDirToArray: function(srcPath, reject) {
		var promise = new Promise(function(res, rej) {
			fs.readdir(srcPath, function(err, files) {
				var arr, promises;
				if (err) {
					console.error(err)
					reject(err)
					return
				} else {
					promises = files.map(function(file) {
						return util.getFileObj(srcPath, file)
					})
				}
				Promise.all(promises).then(function(result) {
					res(result)
				})
			})
		})
		return promise
	},
	getFileObj: function(srcPath, file) {
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
			obj.relativePath = path.relative(projectRoot, filePath)
			if (stat.isFile()) {
				obj.isDirectory = false
				res(obj)
			}
			if (stat.isDirectory()) {
				obj.isDirectory = true
				var p = new Promise(function(resolve, reject) {
					util.getData(filePath, resolve, reject)
				})
				p.then(function(arr) {
					obj.childrens = arr
					res(obj)
				})
			}
		})
		return promise
	}
}

module.exports = util