import { describe, expect, it } from "bun:test"

import { formatFixtures } from "../formatFixtures/formatFixtures.ts"

const formatFixture = await formatFixtures()

describe("baseConfig", () => {
  it.each([
    ["insertFinalNewline", "index.ts"],
    ["printWidth", "fits.ts"],
    ["printWidth", "overflows.ts"],
    ["quoteProps", "index.ts"],
    ["semi", "index.ts"],
    ["singleQuote", "index.ts"],
    ["sortImports", "index.ts"],
    ["sortPackageJson", "package.json"],
    ["tabWidth", "index.ts"],
    ["trailingComma", "index.ts"],
    ["useTabs", "index.ts"],
  ] as const)("%s: %s が期待どおりに整形される", async (option, file) => {
    const { actual, expected } = await formatFixture(option, file)
    expect(actual).toBe(expected)
  })
})
