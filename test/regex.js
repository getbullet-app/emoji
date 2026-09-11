/**
 * Adapted with modifications from
 * https://github.com/slevithan/emoji-regex-xs/blob/main/test/tests.js
 * MIT © Steven Levithan
 */
const test = require("brittle")
const { regex } = require("@bullet./emoji")
const { EMOJI_SEQUENCES, EXCLUDE_SEQUENCES, COUNT_SEQUENCES } = require("./fixtures")

test("regex matches expected codepoints", (t) => {
  for (const sequence of EMOJI_SEQUENCES) {
    t.ok(regex().test(sequence))
    t.is(sequence.match(regex())[0], sequence)
  }
})

test("regex does not match non-emoji sequences", (t) => {
  for (const sequence of EXCLUDE_SEQUENCES) {
    t.absent(regex().test(sequence))
    t.absent(regex().test(`${sequence}\u{FE0F}`))
  }
})

test("matches adjacent emoji sequences as separate matches", (t) => {
  for (const [sequence, count] of COUNT_SEQUENCES) {
    t.is(sequence.match(regex()).length, count)
  }
})
