# dedupify
[![version](https://img.shields.io/npm/v/dedupify.svg)](https://www.npmjs.org/package/dedupify)
[![status](https://travis-ci.org/zoubin/dedupify.svg)](https://travis-ci.org/zoubin/dedupify)
![node](https://img.shields.io/node/v/dedupify.svg)

Replace the default dedupe transform for browserify,
to fix [substack/factor-bundle#51](https://github.com/substack/factor-bundle/issues/51).

## Usage

```js
const browserify = require('browserify')
const dedupify = require('dedupify')

var b = browserify(opts)
b.plugin(dedupify)
b.on('dedupify.deduped', (o) => {
  console.warn('Duplicates of modules found!', o.file, o.dup)
})

```

**NOTE**
This plugin disables the dedupe transform, so you probably should warn the developer to reinstall dependencies manually.

## Events

### b.on('dedupify.deduped', o)

`o.file` and `o.dup` are file paths to the two modules
which have the same contents.

