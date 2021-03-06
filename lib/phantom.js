var phantom = require('phantom')
var path = require('path')
var fs = require('fs')
var base = require('./base.js')

var phInstance = null
var phPage = null

phantom.create()
	.then(instance => {
		phInstance = instance
		return phInstance.createPage()
	})
	.then(page => {
		phPage = page
		return page.open('http://localhost:' + base.option.port)
	})
	.then(status => {
		return phPage.property('content')
	})
	.then(content => {
		if (base.img) {
			console.log()
			console.log(`The image has been created successfully!`.green.bold)
			return phPage.render(path.join(base.projectRoot, base.option.output || './ctree.png'))
		}
		if (base.page) {
			return createPage(content)
		}
		return false
	})
	.then(() => {
		phInstance.exit()
		!base.server && process.exit()
	})
	.catch(error => {
		console.error(colors.red(error))
		phInstance.exit()
		!base.server && process.exit()
	})

function createPage(content) {
	return new Promise((res, rej) => {
		fs.writeFile(path.join(base.projectRoot, base.option.output || './ctree.html'), content, function(err) {
			if (err) {
				return rej(err)
			}
			console.log()
			console.log(`The page has been created successfully!`.green.bold)
			res()
		})
	})
}