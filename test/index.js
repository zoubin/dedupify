'use strict'

const test = require('tap').test
const browserify = require('browserify')
const fs = require('fs')
const dedupify = require('..')

test('dedupe', function (t) {
  t.plan(2)
  let basedir = __dirname + '/fixtures'
  browserify(['a.js', 'aa.js'], { basedir: basedir })
    .plugin(dedupify)
    .on('dedupify.deduped', o => {
      t.same(o, {
        file: basedir + '/aa.js',
        dup: basedir + '/a.js',
      })
    })
    .bundle(function (err, body) {
      t.same(
        body.toString(),
        fs.readFileSync(basedir + '/expected.js', 'utf8')
      )
    })
})

