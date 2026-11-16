import { expect, it } from "vitest"

it("calls back", () => {
  const values = new Set([true])

  values.forEach((value) => {
    expect(value).toBe(true)
  })
})
