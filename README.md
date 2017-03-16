# ctree
![ctree](http://7xqnme.com1.z0.glb.clouddn.com/16-12-21/43682618-file_1482331852927_2e64.png)

## What is ctree?
Through nodeJS quickly generate project directory tree structure. There are four ways:

 - **server** - Open the local server to view tree
 - **txt** - According to the directory structure to generate a txt file
 - **img** - According to the directory structure to generate an image file
 - **page** - According to the directory structure to generate a page
 - **log** - Print the directory structure to the shell, this is default

## Dependencies

 - [vue](https://www.npmjs.com/package/vue)
 - [vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer)
 - [phantom](https://www.npmjs.com/package/phantom)


## Install
``` bash
# globel install
npm install -g ctree
```

## Usage
``` bash
# Any place, any folder
ctree -p src/
```

## Option
Can through two ways to configure ctree:
1. Through `.js` configuration (default: `.dirrc.js`)
2. Through the command to configure.

The priority is `command` > `.js` > `default`

default option:
```js
// .dirrc.js
module.exports = {
	path: './src',
	ignore: ['node_modules/', '.git/'],
	limit: 0,
	port: 8080
}
```


### options 
format:    `key [ command key ] { description } defaultValue`
``` bash
path [p] {The path of the directory tree} `src/`
config [c] {The path of the custom configurations} `.dirrc.js`
port [d] {The port number, only useful in server mode} `8080`
output [o] {The output file name, only useful in `txt img page` mode} `ctree.[txt, png, html]`
limit [i] {Limit display level, `0` is unlimited} `0`
ignore [g] {Ignore files spanning tree} `['node_modules/', '.git/']`
```
