'use strict'

const startServer = function(arr) {
	var fs = require('fs')
	var path = require('path')
	var express = require('express')
	var opn = require('opn')

	var app = express()
	var base = require('./base.js')
	var option = base.option
	var port = option.port

	global.Vue = require('vue')
	var layout = fs.readFileSync(path.join(__dirname, '../static/index.html'), 'utf8')

	var renderer = require('vue-server-renderer').createRenderer()

	app.use('/assets', express.static(
	  path.resolve(__dirname, '../static/assets')
	))

	app.get('*', function(request, response) {
	  render(arr, response)
	})

	function render(arr, response) {
	  if (Array.isArray(arr)) {
	    renderer.renderToString(
	      require('../static/assets/app')(arr),
	      function(error, html) {
	        if (error) {
	          console.error(colors.red(error))
	          return response
	            .status(500)
	            .send('Server Error')
	        }
	        response.send(layout.replace('<div id="app"></div>', html))
	      }
	    )
	  } else {
	    response.send(layout.replace('<div id="app"></div>', err))
	  }
	}

	app.listen(port, function(err) {
	  if (err) {
	    console.error(colors.red(err))
	    return false
	  }
	  var uri = 'http://localhost:' + port
	  if(base.img || base.page) require('../phantomJS.js')
	  base.server && console.log(`The server has been open, through open the ${uri} to access`.green)
	  base.server && opn(uri)
	})
}

module.exports = startServer