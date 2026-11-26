import { describe, expect, it } from "vitest"

import { getData } from "./getData.ts"

describe(getData, () => {
  describe("severity が string literal の時", () => {
    it.each([
      ["allow", { color: "--color-severity-allow", text: "ALLOW" }],
      ["deny", { color: "--color-severity-error", text: "ERROR" }],
      ["error", { color: "--color-severity-error", text: "ERROR" }],
      ["warn", { color: "--color-severity-warn", text: "WARN" }],
      ["off", { color: "--color-severity-off", text: "OFF" }],
    ] as const)("引数が %o の時、%o を返す", (input, output) => {
      expect(getData(input)).toStrictEqual(output)
    })
  })

  describe("severity が number の時", () => {
    it.each([
      [3, { color: "--color-severity-off", text: "OFF" }],
      [2, { color: "--color-severity-error", text: "ERROR" }],
      [1, { color: "--color-severity-warn", text: "WARN" }],
      [0, { color: "--color-severity-off", text: "OFF" }],
      [-1, { color: "--color-severity-off", text: "OFF" }],
    ] as const)("引数が %o の時、%o を返す", (input, output) => {
      expect(getData(input)).toStrictEqual(output)
    })
  })

  describe("severity が想定外の値の時", () => {
    it.each([["unknown"], [undefined], [null], [true]] as const)(
      "引数が %o の時、off の色で UNKNOWN を返す",
      (input) => {
        expect(getData(input)).toStrictEqual({ color: "--color-severity-off", text: "UNKNOWN" })
      },
    )
  })
})
