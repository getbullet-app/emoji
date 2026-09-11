# @bullet./emoji

This repository contains script to build BulletMoji font (fork of [OpenMoji](https://github.com/hfg-gmuend/openmoji)) and package it for use in React Native apps (Android, iOS, web).

General utilities for working with emoji are also included.

> BulletMoji font and other emoji utilities have been customized to include/accept bullet.-branded non-standard symbols

## Building the font

To build the font, first install dependencies. For macOS run

```sh
brew install python3 woff2 xmlstarlet
```

For Ubuntu

```sh
sudo apt install woff2 xmlstarlet
```

Then to generate artifacts

```sh
npm run generate:font
```

The script will download OpenMoji SVGs and metadata, exclude all the `extra-*` SVGs, and place the generated font files in `./font`.

Currently COLRv1 TTF for android and COLRv1 + OT-SVG WOFF2 for everything else are being built.

## Using with React Native

React Native does not recognize WOFF2 fonts as assets by default. You can customize this in `metro.config.js`, a convenience plugin is also included:

```javascript
const { getDefaultConfig } = require("expo/metro-config")
const { withWOFF2 } = require("@bullet./emoji/metro")

const config = getDefaultConfig(__dirname)

module.exports = withWOFF2(config)
```

Then, in your app:

```javascript
import { useFonts } from "expo-font"
import { BulletMoji_400Regular } from "@bullet./emoji/font"

// ...
const [loaded, error] = useFonts({ BulletMoji_400Regular })
// ...
```

## Utilities

All utilities are named exports from root package, e.g.:

```javascript
import { emojify } from "@bullet./emoji"
```

### `const regexp = regex()`

Regular expression to match all emoji, including bullet. branded ones, forked from [emoji-regex-xs](https://github.com/slevithan/emoji-regex-xs).

### `const withEmojis = emojify(withShortCodes)`

Replace all short codes fenced with colons in string with corresponding emoji, e.g. `:+:` becomes 👍.

### `const withShortCodes = codify(withEmojis)`

Replace all emojis in string with corresponding short codes fenced with colons, e.g. ❤️ becomes `:heart:`.

### `const emoji = toEmoji(shortCode)`

Convert bare short code to emoji, e.g. `flag_lt` -> 🇱🇹.

### `const shortCode = toShortCode(emoji)`

Convert emoji to bare short code, e.g. 🤘🏻 -> `metal_tone1`.

#### Note

`toEmoji()` and `toShortCode()` have been forked from [emoji-index](https://github.com/holepunchto/emoji-index) and extended to support all skin tones in addition to bullet. branded emojis.

## License

All code licensed under Apache-2.0

Original emoji assets designed by [OpenMoji](https://openmoji.org/) – the open-source emoji and icon project, and released under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
