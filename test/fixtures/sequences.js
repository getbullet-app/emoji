const UNICODE_SEQUENCES = require("./unicode-17.0.0")

// From <https://github.com/mathiasbynens/emoji-test-regex-pattern/blob/main/script/get-sequences.js>
const BULLET_SEQUENCES = [
  // U+204D BLACK RIGHTWARDS BULLET
  "\u{204D}",
]
const BASE_SEQUENCES = [
  // U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
  // U+1F1EA REGIONAL INDICATOR SYMBOL LETTER E
  // → flag for Yemen
  "\u{1F1FE}\u{1F1EA}",
  // U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
  // U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
  // → flag for United States
  "\u{1F1FA}\u{1F1F8}",
  // U+1F469 WOMAN
  // U+1F3FE EMOJI MODIFIER FITZPATRICK TYPE-5
  // U+200D ZERO WIDTH JOINER
  // U+2708 AIRPLANE
  // U+FE0F VARIATION SELECTOR-16
  // → woman pilot: medium-dark skin tone
  "\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F",
  // Test an `Emoji_Modifier_Base` followed by an `Emoji_Modifier`.
  "\u{1F469}\u{1F3FF}",
  // Test an `Emoji_Modifier_Base` not followed by an `Emoji_Modifier`.
  "\u{1F469}",
  // Test a default text presentation character rendered as emoji.
  "\u{2194}\uFE0F",
  "\u{1F321}\uFE0F",
  "\u261D\uFE0F",
  // Test an emoji that was added in v4 of emoji-data.txt.
  "\u{1F923}", // U+1F923 ROLLING ON THE FLOOR LAUGHING
  // Test a regular emoji sequence (`emoji-sequences.txt`).
  "1\uFE0F\u20E3",
  "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
  // Test a ZWJ emoji sequence (`emoji-zwj-sequences.txt`).
  "\u{1F3CA}\u{1F3FD}\u200D\u2640\uFE0F",
  // Test an Emoji 13.1 sequence.
  "\u{1F48F}\u{1F3FF}",
  // women wrestling: light skin tone (added to draft Emoji 17.0 in 2025)
  "\u{1F93C}\u{1F3FB}\u{200D}\u{2640}\u{FE0F}",
  // flag for Texas
  "\u{1F3F4}\u{E0075}\u{E0073}\u{E0074}\u{E0078}\u{E007F}",
  // ninja cat
  "\u{1F431}\u{200D}\u{1F464}",
]
const EXTRA_SEQUENCES = [
  // The following handshake emoji sequences were officially added in
  // Emoji 14.0.
  "\u{1F91D}\u{1F3FB}", // handshake: light skin
  "\u{1F91D}\u{1F3FC}", // handshake: medium-light skin
  "\u{1F91D}\u{1F3FD}", // handshake: medium skin
  "\u{1F91D}\u{1F3FE}", // handshake: medium-dark skin
  "\u{1F91D}\u{1F3FF}", // handshake: dark skin

  "\u{1F93C}\u{1F3FB}", // wrestlers: light skin
  "\u{1F93C}\u{1F3FC}", // wrestlers: medium-light skin
  "\u{1F93C}\u{1F3FD}", // wrestlers: medium skin
  "\u{1F93C}\u{1F3FE}", // wrestlers: medium-dark skin
  "\u{1F93C}\u{1F3FF}", // wrestlers: dark skin

  // Overqualified emoji sequences as entered via the iOS emoji picker.
  "\u231A\uFE0F", // watch
  "\u231B\uFE0F", // hourglass
  "\u25FE\uFE0F", // black medium small square
  "\u2614\uFE0F", // umbrella with rain drops
  "\u2615\uFE0F", // hot beverage
  "\u2648\uFE0F", // Aries
  "\u2649\uFE0F", // Taurus
  "\u264A\uFE0F", // Gemini
  "\u264B\uFE0F", // Cancer
  "\u264C\uFE0F", // Leo
  "\u264D\uFE0F", // Virgo
  "\u264E\uFE0F", // Libra
  "\u264F\uFE0F", // Scorpius
  "\u2650\uFE0F", // Sagittarius
  "\u2651\uFE0F", // Capricorn
  "\u2652\uFE0F", // Aquarius
  "\u2653\uFE0F", // Pisces
  "\u267F\uFE0F", // wheelchair symbol
  "\u26AA\uFE0F", // medium white circle
  "\u26BD\uFE0F", // soccer ball
  "\u26BE\uFE0F", // baseball
  "\u26C4\uFE0F", // snowman without snow
  "\u26F2\uFE0F", // fountain
  "\u26F3\uFE0F", // flag in hole
  "\u26F5\uFE0F", // sailboat
  "\u26FA\uFE0F", // tent
  "\u2757\uFE0F", // heavy exclamation mark symbol
  "\u2B1B\uFE0F", // black large square
  "\u2B1C\uFE0F", // white large square
  "\u2B55\uFE0F", // heavy large circle
  "\u{1F004}\uFE0F", // mahjong tile red dragon
]

module.exports.EMOJI_SEQUENCES = [
  ...BULLET_SEQUENCES,
  ...BASE_SEQUENCES,
  ...UNICODE_SEQUENCES,
  ...EXTRA_SEQUENCES,
]

module.exports.EXCLUDE_SEQUENCES = [
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
]

module.exports.COUNT_SEQUENCES = [
  ["\u{1F431}\u{1F464}", 2],
  ["🇧🇷🇯🇵🏳️‍🌈🇺🇸", 4],
]
