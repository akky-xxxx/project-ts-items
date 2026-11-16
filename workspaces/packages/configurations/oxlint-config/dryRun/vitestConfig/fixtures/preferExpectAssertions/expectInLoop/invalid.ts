import { expect, it } from "vitest"

it("loops", () => {
  for (const value of [true]) {
    expect(value).toBe(true)
  }
})
