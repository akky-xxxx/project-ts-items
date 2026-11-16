import { expect, it } from "vitest"

it("loops", () => {
  expect.hasAssertions()
  for (const value of [true]) {
    expect(value).toBe(true)
  }
})
