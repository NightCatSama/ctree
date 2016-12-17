'use strict'
var base = require('./base.js');

//Spanning tree structure in the shell
const log = function(arr) {
  var str = base.option.path + '/\n';
  var level = 0
  str = createLine(OrderTree(arr), str, level, [])
  console.log(str)
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

function createLine(arr, str, level, level_empty) {
  var len = arr.length
  Array.from(arr, (obj, i) => {
    var isLast = (len - 1) === i
    str += prevLine(level, obj.inLastDirectory, level_empty) + ((isLast ? '└─ ' : '├─ ') + obj.name + (obj.isDirectory ? '/' : '')) + '\n'
    if (obj.isDirectory && obj.childrens.length) {
      if (obj.isLastDirectory) {
        level_empty[level] = true
      }
      str += createLine(OrderTree(obj.childrens), '', level + 1, level_empty)
    }
  })
  return str;
}

function prevLine(level, isLast, level_empty) {
  var str = ''
  for (var i = 0; i < level; i++) {
    if (isLast && i === level - 1 || level_empty[i]) {
      str += '   '
    }
    else {
      str += '│  '
    }
  }
  return str
}

module.exports = log