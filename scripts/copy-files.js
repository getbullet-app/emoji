#!/usr/bin/env node
const fs = require("node:fs")
const path = require("node:path")

const files = ["index.js", "index.d.ts", "font.js"]
const srcDir = path.resolve(__dirname, "../src")
const outDir = path.resolve(__dirname, "../dist")

fs.mkdirSync(outDir, { recursive: true })

for (const file of files) {
  fs.copyFileSync(path.join(srcDir, file), path.join(outDir, file))
}
