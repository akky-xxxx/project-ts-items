import { expect, it } from "vitest"

it("calls back", () => {
  expect.hasAssertions()
  const values = new Set([true])

  values.forEach((value) => {
    expect(value).toBe(true)
  })
})
