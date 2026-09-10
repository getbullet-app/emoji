#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")
const regex = require("../src/regex")

const outDir = path.resolve(__dirname, "../dist")

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, "regex.js"),
  `module.exports = () => /${regex.source}/${regex.flags}`,
  "utf-8",
)
