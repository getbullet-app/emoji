import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { useCallback, useState } from "react"
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { regex, toEmoji, toShortCode } from "@bullet./emoji"
import {
  EMOJI_SEQUENCES,
  EXCLUDE_SEQUENCES,
  COUNT_SEQUENCES,
  SHORTCODES,
} from "@bullet./emoji/fixtures"
import { BulletMoji_400Regular } from "@bullet./emoji/font"
import data from "emojibase-data/en/data.json"

const EMOJI_STRING = ["\u204D", ...data.map((e) => e.emoji)].join("")
const TEST_COUNT =
  EMOJI_SEQUENCES.length +
  EXCLUDE_SEQUENCES.length +
  COUNT_SEQUENCES.length +
  SHORTCODES.length * 2

function Preview() {
  const [successes, setSuccesses] = useState(0)
  const [failures, setFailures] = useState(0)
  const [loaded, error] = useFonts({ BulletMoji_400Regular })

  const test = useCallback(async () => {
    let successes = 0
    let failures = 0

    for (const sequence of EMOJI_SEQUENCES) {
      if (regex().test(sequence) && sequence.match(regex())?.[0] === sequence) {
        successes++
      } else {
        failures++
        console.warn(`Failed to match: "${sequence}"`)
      }
    }

    for (const sequence of EXCLUDE_SEQUENCES) {
      if (!regex().test(sequence) && !regex().test(`${sequence}\u{FE0F}`)) {
        successes++
      } else {
        failures++
        console.warn(`Failed to exclude: "${sequence}"`)
      }
    }

    for (const [sequence, expected] of COUNT_SEQUENCES) {
      const actual = sequence.match(regex())?.length

      if (actual === expected) {
        successes++
      } else {
        failures++
        console.warn(`Failed count: "${sequence}" expected ${expected} got ${actual}`)
      }
    }

    for (const [emoji, shortCode] of SHORTCODES) {
      const actual = toShortCode(emoji)

      if (actual === shortCode) {
        successes++
      } else {
        failures++
        console.warn(`Failed to shortCode: expected "${shortCode}" got "${actual}"`)
      }
    }

    for (const [emoji, shortCode] of SHORTCODES) {
      const actual = toEmoji(shortCode)

      if (actual === emoji) {
        successes++
      } else {
        failures++
        console.warn(`Failed to emoji: expected "${emoji}" got "${actual}"`)
      }
    }

    setFailures(failures)
    setSuccesses(successes)
  }, [])

  if (error) {
    console.error(error)
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      {loaded ? (
        <>
          <Text>
            Test Results: {successes}/{TEST_COUNT} successes; {failures}/{TEST_COUNT} failures
          </Text>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
            <Text style={styles.preview}>{EMOJI_STRING}</Text>
          </ScrollView>
          <View style={styles.toolbar}>
            <Button title="Test" onPress={test} />
          </View>
          <StatusBar style="auto" />
        </>
      ) : (
        <ActivityIndicator animating={!loaded} style={styles.spinner} />
      )}
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Preview />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  preview: {
    flex: 1,
    width: "100%",
    fontFamily: "BulletMoji_400Regular",
    fontSize: 28,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  spinner: {
    width: 64,
    height: 64,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
  },
})
