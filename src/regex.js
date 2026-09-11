const bulletmoji = require("../data/bulletmoji.json")
  .map((e) => `\\u{${e.hexcode}}`)
  .join("|")

/**
 * Adapted with modifications from
 * https://github.com/slevithan/emoji-regex-xs/blob/main/regex.mjs
 * MIT © Steven Levithan
 */
const r = String.raw
const base = r`(?:\p{Emoji}|${bulletmoji})(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`

exports.regex = new RegExp(
  r`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${base}(?:\u200D${base})*`,
  "gu",
)
