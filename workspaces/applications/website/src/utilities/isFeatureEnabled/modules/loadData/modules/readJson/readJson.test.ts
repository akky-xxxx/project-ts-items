import { describe, expect, it, vi } from "vitest"

import { readJson } from "./readJson.ts"

vi.mock(import("server-only"), () => ({}))

describe(readJson, () => {
  it("絶対パスのとき、そのファイルを読み込んでパース前の値を返す", async () => {
    expect.hasAssertions()
    await expect(
      readJson(`${import.meta.dirname}/testData/featureFlag.json`),
    ).resolves.toStrictEqual({ sampleFeature: "disabled", unknownFeature: "on" })
  })

  it("相対パスのとき、カレントディレクトリからのパスとして読み込む", async () => {
    expect.hasAssertions()
    vi.spyOn(process, "cwd").mockReturnValueOnce(import.meta.dirname)
    await expect(readJson("testData/featureFlag.json")).resolves.toStrictEqual({
      sampleFeature: "disabled",
      unknownFeature: "on",
    })
  })

  it("ファイルが無いとき、reject する", async () => {
    expect.hasAssertions()
    await expect(readJson(`${import.meta.dirname}/testData/notFound.json`)).rejects.toThrow(
      "ENOENT",
    )
  })
})
