import { expect, it } from "vitest"

it("resolves", async () => {
  const value = await Promise.resolve(true)

  expect(value).toBe(true)
})
