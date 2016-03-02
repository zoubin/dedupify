'use strict'

const stream = require('stream')

module.exports = function (b) {
  let undef
  b.on('reset', dedupify)
  dedupify()

  function dedupify() {
    let map = Object.create(null)
    let deduped
    b.pipeline.get('dedupe').unshift(stream.Transform({
      objectMode: true,
      transform: function (row, _, next) {
        map[row.id] = row.file
        if (!deduped && row.dedupe) {
          deduped = { id: row.id, dup: row.dedupe }
        }
        row.dedupe = undef
        row.sameDeps = undef
        row.dedupeIndex = undef
        next(null, row)
      },
      flush: function (next) {
        if (deduped) {
          b.emit('dedupify.deduped', {
            file: map[deduped.id],
            dup: map[deduped.dup],
          })
        }
        next()
      },
    }))
  }
}

