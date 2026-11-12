import { describe, expect, it } from "vitest"

import { getCurrentLanguageName } from "./getCurrentLanguageName.ts"

type TestCase = [Parameters<typeof getCurrentLanguageName>[0], string]

describe("getCurrentLanguageName", () => {
  it.each([
    ["en", "English"],
    ["ja", "日本語"],
  ] as const satisfies TestCase[])("getCurrentLanguageName(%s) // %s", (locale, expectedValue) => {
    expect(getCurrentLanguageName(locale)).toBe(expectedValue)
  })
})
