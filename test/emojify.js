const test = require("brittle")
const { emojify, codify } = require("@bullet./emoji")
const { EMOJIFY } = require("./fixtures")

test("emojifies string", (t) => {
  for (const [output, input] of EMOJIFY) {
    t.is(emojify(input), output)
  }
})

test("codifies string", (t) => {
  for (const [input, output] of EMOJIFY) {
    t.is(codify(input), output)
  }
})
