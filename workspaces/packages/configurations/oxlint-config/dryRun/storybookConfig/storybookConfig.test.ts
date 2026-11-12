import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({
  fixturesDirectory: "storybookConfig/fixtures",
  target: "storybook",
})

describe("storybookConfig の stories 向け override", () => {
  it.each([
    ["maxLines/invalid.stories.ts", "eslint(max-lines)", "error"],
    ["maxLines/valid.stories.ts", "eslint(max-lines)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
