# ctree

## What is ctree?
Through nodeJS quickly generate project directory tree structure. There are four ways:

- **server** - Open the local server to view tree
- **img** - According to the directory structure spanning tree images
- **page** - According to the directory structure to generate the page
- **log** - According to the directory structure in the shell, default it

## dependencies

 - [vue](https://www.npmjs.com/package/vue)
 - [vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer)
 - [phantom](https://www.npmjs.com/package/phantom)

## Usage
``` bash
# globel install
npm install -g ctree

# local install
npm install ctree

# ready
ctree
```

## Option
Can through two ways to configure ctree:
1. Through `.js` configuration (default: `.dirrc.js`)
2. Through the command to configure.

The priority is `command` > `.js` > `default`

default option:
```js
module.exports = {
  path: './src',
  img_path: './dir.png',
  page_path: './dir.html',
  port: 233
}
```

### through `.js` setting
```js
//  .dirrc.js
module.exports = {
  path: './test',
  img_path: './tree.jpg',
  page_path: './tree.html'
  port: 233
}
```

### through `command` setting
- project path (default: `./src`)
example:

```js
ctree -p src
// or
ctree --path=src
```

- custom config (default: `./dirrc.js`)
example:

```js
ctree -c ./config/.dirrc.js
// or
ctree --config=./config/.dirrc.js
```

- set port (default: `233`)
example:

```js
ctree server -d 8080
// or
ctree server --port=8080
```

- The path of the generated image (default: `./index.png`)
example:

```js
ctree img -i img.jpg
// or
ctree img --img_path=img.jpg
```

- The path of the generated html (default: `./dir.html`)
example:

```js
ctree img -h pm.html
// or
ctree img --page_page=pm.html
```
