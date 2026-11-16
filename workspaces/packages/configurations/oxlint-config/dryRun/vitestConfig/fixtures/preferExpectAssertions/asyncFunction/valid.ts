import { expect, it } from "vitest"

it("resolves", async () => {
  expect.hasAssertions()
  const value = await Promise.resolve(true)

  expect(value).toBe(true)
})
