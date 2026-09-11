#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")
const { regex } = require("../src/regex")

const outDir = path.resolve(__dirname, "../dist")

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, "regex.js"),
  `exports.regex = function regex() {
  return /${regex.source}/${regex.flags}
}\n`,
  "utf-8",
)
