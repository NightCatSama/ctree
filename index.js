var fs = require('fs')
global.colors = require('colors')
var base = require('./lib/base.js')
var util = require('./lib/util.js')

var kinds = base.kinds
var srcPath = base.srcPath

//  get Array of directory tree structure
function getTreeData() {
  var promise = new Promise((resolve, reject) => {
    util.getData(srcPath, resolve, reject)
  })
  promise.then(function(arr) {
    start(arr)
  }, function(err) {
    console.error(err)
  })
}

//According to the user's parameters corresponding to different operation
function start(arr) {
  if (kinds.length === 0) {
    require('./lib/log.js')(arr)
  }
  else {
    kinds.indexOf('log') > -1 && require('./lib/log.js')(arr)
    var server_kinds = ['img', 'server', 'page']
    server_kinds.some(kind => kinds.indexOf(kind) > -1) && require('./lib/server.js')(arr)
  }
}

getTreeData();