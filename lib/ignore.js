var base = require('./base.js')
var path = require('path')
var ignore = base.option.ignore

var global_rules = {}
var rules = formatIgnore(ignore)

function createdDefaultObj(_path) {
	return {
		path: _path,
		onAll: false,  //  Whether all ignore
		ext: [],       //  Extension filtering rules
		files: [],     //  File filtering rules
		folders: {}   //  folders filtering rules
	}
}

//  According to ignore Settings to generate rules
function formatIgnore(ignore) {
	var obj = createdDefaultObj(base.srcPath)
	Array.from(ignore, (rule) => {
		obj = cteateRule(rule, obj, base.srcPath)
	})
	return obj
}

function cteateRule(rule, o, _path) {
	if (!rule) return false
	var obj = o || createdDefaultObj(_path)
	var rule_arr = rule.split('/')
	rule_arr[0] === '.' && rule_arr.shift()

	var r = rule_arr.shift()
	if (r.indexOf('*') === 0) {
		var isExt = r.match(/\*\.([a-zA-Z]+)/)
		if (isExt && isExt[1]) {
			if (r.indexOf('**') === 0) {
				if (global_rules[_path]) {
					global_rules[_path].push(isExt[1])
				}
				else {
					global_rules[_path] = [isExt[1]]
				}
			}
			else {
				obj.ext.push(isExt[1])
			}
		}
		else {
			obj.onAll = true
		}
	}
	else if (rule_arr[0] === undefined) {
		obj.files.push(r)
	}
	else if (rule_arr[0]) {
		obj.folders[r] = cteateRule(rule_arr.join('/'), null, path.join(_path, r))
	}
	else {
		obj.folders[r] = {
			onAll: true
		}
	}
	return obj
}

function isIgnore(obj, rule) {
	if (rule.onAll) return true

	if (obj.isDirectory) {
		var f_rule = rule.folders[obj.name]
		if (f_rule) {
			if (f_rule.onAll) {
				return true
			}
			return f_rule
		}
		else {
			return false
		}
	}
	else {
		if (rule.ext.indexOf(obj.ext) > -1 || rule.files.indexOf(obj.name) > -1) {
			return true
		}
		return isGlobalIgnore(obj)
	}
}

function isGlobalIgnore(obj) {
	for (var p in global_rules) {
		if (path.relative(p, path.join(obj.path, '../')).indexOf('..') === -1) {
			if (global_rules[p].indexOf(obj.ext) > -1) {
				return true
			}
		}
	}
	return false
}

module.exports = {
	rules: rules,
	isGlobalIgnore: isGlobalIgnore,
	isIgnore: isIgnore
}