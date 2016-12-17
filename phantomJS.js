var phantom = require('phantom')
var path = require('path')
var fs = require('fs')
var base = require('./lib/base.js')

var phInstance = null;
var phPage = null;
phantom.create()
  .then(instance => {
    phInstance = instance
    return phInstance.createPage()
  })
  .then(page => {
    phPage = page
    return page.open('http://localhost:233/')
  })
  .then(status => {
    return phPage.property('content')
  })
  .then(content => {
    if (base.img) {
      console.log(`The image has been created successfully! Open ${base.option.img_path} can to view!`.green.bold)
      return phPage.render(path.join(base.projectRoot, base.option.img_path))
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
    fs.writeFile(path.join(base.projectRoot, base.option.page_path), content, function(err) {
      if (err) {
        return rej(err)
      }
      console.log(`The page has been created successfully! Open ${base.option.page_path} can access!`.green.bold)
      res()
    })
  })
}