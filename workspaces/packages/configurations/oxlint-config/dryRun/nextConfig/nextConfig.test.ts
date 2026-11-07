import { describe, expect, it } from "bun:test"

import { lintFixtures } from "../lintFixtures/lintFixtures.ts"

const getSeverity = await lintFixtures({
  fixturesDirectory: "nextConfig/fixtures",
  target: "next",
})

describe("nextConfig の Next.js 規約ファイル向け override", () => {
  it.each([
    ["conventionFiles/app/[locale]/other.tsx", "import(no-default-export)", "error"],
    ["conventionFiles/app/[locale]/page.tsx", "import(no-default-export)", "none"],
    ["layout/app/[locale]/layout.tsx", "eslint(new-cap)", "none"],
    ["layout/app/[locale]/layout.tsx", "import(no-unassigned-import)", "none"],
    ["layout/app/[locale]/other.tsx", "eslint(new-cap)", "error"],
    ["layout/app/[locale]/other.tsx", "import(no-unassigned-import)", "error"],
    ["proxy/other.ts", "import(no-default-export)", "error"],
    ["proxy/proxy.ts", "import(no-default-export)", "none"],
  ] as const)("%s で %s が %s になる", (fixture, code, expected) => {
    expect(getSeverity(code, fixture)).toBe(expected)
  })
})
