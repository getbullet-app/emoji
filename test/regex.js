/**
 * Adapted with modifications from
 * https://github.com/slevithan/emoji-regex-xs/blob/main/test/tests.js
 * MIT © Steven Levithan
 */
const test = require("brittle")
const { regex } = require("@bullet./emoji")

const EMOJI_SEQUENCES = require("./fixtures/sequences")

test("regex matches expected codepoints", (t) => {
  for (const sequence of EMOJI_SEQUENCES) {
    t.ok(regex().test(sequence))
    t.alike(sequence.match(regex())[0], sequence)
  }
})

test("regex does not match non-emoji sequences", (t) => {
  for (const char of [
    "A",
    "\u200D",
    "\u20E3",
    "\uFE0F",
    // Within \p{Emoji}
    "#",
    "*",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]) {
    t.absent(regex().test(char))
    t.absent(regex().test(`${char}\u{FE0F}`))
  }
})

test("matches adjacent emoji sequences as separate matches", (t) => {
  t.is("\u{1F431}\u{1F464}".match(regex()).length, 2)
  t.is("🇧🇷🇯🇵🏳️‍🌈🇺🇸".match(regex()).length, 4)
})
