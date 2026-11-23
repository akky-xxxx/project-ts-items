import { describe, expect, it, mock } from "bun:test"
import path from "node:path"

import { uploadWebsiteJson } from "./uploadWebsiteJson.mts"

const PACKAGE_ROOT_DIRECTORY = path.resolve(import.meta.dirname, "../../../")

const environmentVariables = {
  BLOB_READ_WRITE_TOKEN_PRD: "prd-token",
  BLOB_READ_WRITE_TOKEN_STG: "stg-token",
}

const createUploadMock = () =>
  mock<(filePath: string, token: string) => Promise<{ url: string }>>().mockResolvedValue({
    url: "https://example.com/featureFlag.json",
  })

describe("uploadWebsiteJson", () => {
  it("prd の場合は、prd の JSON のパスと PRD のトークンを1回の送信で渡す", async () => {
    const uploadMock = createUploadMock()

    await uploadWebsiteJson("prd", environmentVariables, uploadMock)

    expect(uploadMock.mock.calls).toEqual([
      [path.join(PACKAGE_ROOT_DIRECTORY, "dist/website/prd/featureFlag.json"), "prd-token"],
    ])
  })

  it("stg の場合は、stg の JSON のパスと STG のトークンを1回の送信で渡す", async () => {
    const uploadMock = createUploadMock()

    await uploadWebsiteJson("stg", environmentVariables, uploadMock)

    expect(uploadMock.mock.calls).toEqual([
      [path.join(PACKAGE_ROOT_DIRECTORY, "dist/website/stg/featureFlag.json"), "stg-token"],
    ])
  })

  it("送信の結果をそのまま返す", async () => {
    const { url } = await uploadWebsiteJson("prd", environmentVariables, createUploadMock())

    expect(url).toBe("https://example.com/featureFlag.json")
  })

  it("対象の環境のトークンが無い場合は、送信せずにエラーを投げる", async () => {
    const uploadMock = createUploadMock()

    const error = await uploadWebsiteJson(
      "prd",
      { BLOB_READ_WRITE_TOKEN_STG: "stg-token" },
      uploadMock,
    ).catch((error_: unknown) => error_)

    expect(error).toBeInstanceOf(Error)
    expect(uploadMock).not.toHaveBeenCalled()
  })
})
