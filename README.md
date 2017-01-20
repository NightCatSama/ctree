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
``` bash
module.exports = {
	path: './src',
	ignore: ['node_modules/', '.git/'],
	limit: 0,
	port: 8080
}
```

### through `.js` setting
``` bash
//  .dirrc.js
module.exports = {
	path: '../ctree/',
	ignore: ['node_modules/', '.git/'],
	limit: 0,
	port: 233
}
```

### through `command` setting
project path (default: `./src`)<br>
example:

``` bash
ctree -p src
// or
ctree --path=src
```

custom config (default: `./dirrc.js`)<br>
example:

``` bash
ctree -c ./config/.dirrc.js
// or
ctree --config=./config/.dirrc.js
```

set port (default: `8080`)<br>
example:

``` bash
ctree server -d 233
// or
ctree server --port=233
```

The path of the output (default: `./ctree.*`)<br>
example:

``` bash
ctree img -o ctree.jpg
ctree page -o ctree.html
ctree txt -o ctree.txt
// or
ctree img --output=ctree.jpg
ctree page --output=ctree.html
ctree txt --output=ctree.txt
```

Limit display level, `0` is unlimited (default: `0`) <br>
example:

``` bash
ctree log -i 3
// or
ctree log --limit=3
```

Ignore files spanning tree (default: `['node_modules/', '.git/']`) <br>
example:

``` bash
//  ignore Folder, File, A single directory wildcard, Inheritable wildcards
ctree -g "['node_modules/', '.gitignore', 'js/*.json', 'asset/**.md']"
// or
ctree --ignore="['node_modules/', '.gitignore', 'js/*.json', 'asset/**.md']"
```

