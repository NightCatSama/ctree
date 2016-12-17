'use strict'
var base = require('./base.js');

//Spanning tree structure in the shell
const log = function(arr) {
  var str = base.option.path + '/\n';
  var level = 0
  str = createLine(OrderTree(arr), str, level, [])
  console.log(str.bold)
}

function OrderTree(arr) {
  var directoryArr = []
  var fileArr = []
  Array.from(arr, (obj) => {
    if (obj.isDirectory) {
      obj.isCollapse = true
      directoryArr.push(obj)
    } else {
      fileArr.push(obj)
    }
  })
  arr = directoryArr.concat(fileArr)
  var lastDir = arr[arr.length - 1]
  if (lastDir.isDirectory && lastDir.childrens.length > 0) {
    lastDir.isLastDirectory = true
    Array.from(lastDir.childrens, obj => obj.inLastDirectory = true)
  }
  return arr
}

function createLine(arr, str, level, empty_level) {
  var len = arr.length
  Array.from(arr, (obj, i) => {
    var isLast = (len - 1) === i
    var oldArr = empty_level.concat()
    str += prevLine(level, obj.inLastDirectory, empty_level) + ((isLast ? '└─ ' : '├─ ') + obj.name + (obj.isDirectory ? '/' : '')) + '\n'
    if (obj.isDirectory && obj.childrens.length) {
      if (obj.isLastDirectory) {
        empty_level[level] = true
      }
      str += createLine(OrderTree(obj.childrens), '', level + 1, empty_level)
      empty_level = oldArr.concat()
    }
  })
  return str;
}

function prevLine(level, isLast, empty_level) {
  var str = ''
  for (var i = 0; i < level; i++) {
    if (isLast && i === level - 1 || empty_level[i]) {
      str += '   '
    }
    else {
      str += '│  '
    }
  }
  return str
}

module.exports = log