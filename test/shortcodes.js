const test = require("brittle")
const { toEmoji, toShortCode } = require("@bullet./emoji")
const { SHORTCODES } = require("./fixtures")

test("shortcodes to emoji", function (t) {
  for (const [emoji, shortCode] of SHORTCODES) {
    t.is(toEmoji(shortCode), emoji)
  }
})

test("emoji to shortcodes", function (t) {
  for (const [emoji, shortCode] of SHORTCODES) {
    t.is(toShortCode(emoji), shortCode)
  }
})
