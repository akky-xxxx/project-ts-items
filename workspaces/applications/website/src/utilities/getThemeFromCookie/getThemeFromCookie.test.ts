import { describe, expect, it } from "vitest"

import { getThemeFromCookie } from "./getThemeFromCookie.ts"

import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

describe("getThemeFromCookie", () => {
  describe("success pattern", () => {
    it.each([
      ["dark", "dark"],
      ["light", "light"],
      ["system", "system"],
    ] as const)("value.state.theme の値が%oの時、%oを返す", (value, expectedValue) => {
      const input = { value } satisfies Pick<RequestCookie, "value">
      expect(getThemeFromCookie(input)).toBe(expectedValue)
    })
  })

  describe("failure pattern", () => {
    it.each([
      ["dark1", "system"],
      ["light1", "system"],
      ["system1", "system"],
    ] as const)("value.state.theme の値が%oの時、%oを返す", (value, expectedValue) => {
      const input = { value } satisfies Pick<RequestCookie, "value">
      expect(getThemeFromCookie(input)).toBe(expectedValue)
    })
  })
})
