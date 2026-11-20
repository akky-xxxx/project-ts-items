import { describe, expect, it } from "bun:test"

import { getBlobToken } from "./getBlobToken.mts"

const environmentVariables = {
  BLOB_READ_WRITE_TOKEN_PRD: "prd-token",
  BLOB_READ_WRITE_TOKEN_STG: "stg-token",
}

describe("getBlobToken", () => {
  it("prd の場合は BLOB_READ_WRITE_TOKEN_PRD の値を返す", () => {
    expect(getBlobToken("prd", environmentVariables)).toBe("prd-token")
  })

  it("stg の場合は BLOB_READ_WRITE_TOKEN_STG の値を返す", () => {
    expect(getBlobToken("stg", environmentVariables)).toBe("stg-token")
  })

  it("対象の環境変数が未定義の場合は、変数名を含むエラーを投げる", () => {
    expect(() => getBlobToken("prd", { BLOB_READ_WRITE_TOKEN_STG: "stg-token" })).toThrow(
      "BLOB_READ_WRITE_TOKEN_PRD is not defined.",
    )
  })

  it("対象の環境変数が空文字の場合は、変数名を含むエラーを投げる", () => {
    expect(() =>
      getBlobToken("stg", {
        BLOB_READ_WRITE_TOKEN_PRD: "prd-token",
        BLOB_READ_WRITE_TOKEN_STG: "",
      }),
    ).toThrow("BLOB_READ_WRITE_TOKEN_STG is not defined.")
  })
})
