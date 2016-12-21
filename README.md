# ctree
![ctree](http://7xqnme.com1.z0.glb.clouddn.com/16-12-20/76833672-file_1482227415319_7215.png)

## What is ctree?
Through nodeJS quickly generate project directory tree structure. There are four ways:

 - **server** - Open the local server to view tree
 - **img** - According to the directory structure spanning tree images
 - **page** - According to the directory structure to generate the page
 - **log** - According to the directory structure in the shell, default it

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
  img_path: './dir.png',
  page_path: './dir.html',
  port: 233
}
```

### through `.js` setting
``` bash
//  .dirrc.js
module.exports = {
  path: './test',
  img_path: './tree.jpg',
  page_path: './tree.html'
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

set port (default: `233`)<br>
example:

``` bash
ctree server -d 8080
// or
ctree server --port=8080
```

The path of the generated image (default: `./index.png`)<br>
example:

``` bash
ctree img -i img.jpg
// or
ctree img --img_path=img.jpg
```

The path of the generated html (default: `./dir.html`)<br>
example:

``` bash
ctree page -h pm.html
// or
ctree page --page_path=tree.html
```

Limit display level, `0` is unlimited (default: 0) <br>
example:

``` bash
ctree log -i 3
// or
ctree log --limit=3
```

Ignore files spanning tree (default: ['node_modules/', '.git/']) <br>
example:

``` bash
//  ignore Folder, File, A single directory wildcard, Inheritable wildcards
ctree -g "['node_modules/', '.gitignore', 'js/*.json', 'asset/**.md']"
// or
ctree --ignore="['node_modules/', '.gitignore', 'js/*.json', 'asset/**.md']"
```

