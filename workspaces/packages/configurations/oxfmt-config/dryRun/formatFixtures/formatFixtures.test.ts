import { describe, expect, it } from "bun:test"

import { formatFixtures } from "./formatFixtures.ts"

const FIXTURES_DIRECTORY = `${import.meta.dir}/../baseConfig/fixtures`

const formatFixture = await formatFixtures()

describe("formatFixtures", () => {
  it("actual は input を整形した結果、expected は output の内容になる", async () => {
    const [input, output] = await Promise.all([
      Bun.file(`${FIXTURES_DIRECTORY}/semi/input/index.ts`).text(),
      Bun.file(`${FIXTURES_DIRECTORY}/semi/output/index.ts`).text(),
    ])
    const { actual, expected } = await formatFixture("semi", "index.ts")

    expect(input).not.toBe(output)
    expect(actual).toBe(output)
    expect(expected).toBe(output)
  })

  it("存在しない fixture を指定すると reject される", async () => {
    const error: unknown = await formatFixture("notExist", "index.ts").catch(
      (error_: unknown) => error_,
    )

    expect(error).toBeInstanceOf(Error)
  })
})
