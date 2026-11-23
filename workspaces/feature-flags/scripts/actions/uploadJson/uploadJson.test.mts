import { afterAll, afterEach, describe, expect, it, mock } from "bun:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const putMock = mock<() => Promise<{ url: string }>>().mockResolvedValue({
  url: "https://example.com/featureFlag.json",
})

await mock.module("@vercel/blob", () => ({
  put: putMock,
}))

const { uploadJson } = await import("./uploadJson.mts")

const temporaryDirectories: string[] = []

const prepareTemporaryDirectory = () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "upload-json-"))
  temporaryDirectories.push(temporaryDirectory)
  return temporaryDirectory
}

const prepareJsonFile = (content: string) => {
  const filePath = path.join(prepareTemporaryDirectory(), "featureFlag.json")
  fs.writeFileSync(filePath, content)
  return filePath
}

afterEach(() => {
  putMock.mockClear()
})

afterAll(() => {
  for (const temporaryDirectory of temporaryDirectories) {
    fs.rmSync(temporaryDirectory, { force: true, recursive: true })
  }
})

describe("uploadJson", () => {
  it("ファイルの内容を、固定のファイル名・アップロード設定・トークンとともに put に渡す", async () => {
    const filePath = prepareJsonFile('{"sampleFeature":"disabled"}')

    await uploadJson(filePath, "dummy-token")

    expect(putMock).toHaveBeenCalledWith(
      "featureFlag.json",
      Buffer.from('{"sampleFeature":"disabled"}'),
      {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
        contentType: "application/json",
        token: "dummy-token",
      },
    )
  })

  it("put の結果をそのまま返す", async () => {
    const filePath = prepareJsonFile("{}")

    const { url } = await uploadJson(filePath, "dummy-token")

    expect(url).toBe("https://example.com/featureFlag.json")
  })

  it("ファイルが存在しない場合は reject し、put を呼ばない", async () => {
    const filePath = path.join(prepareTemporaryDirectory(), "featureFlag.json")

    const error = await uploadJson(filePath, "dummy-token").catch((error_: unknown) => error_)

    expect(error).toBeInstanceOf(Error)
    expect(putMock).not.toHaveBeenCalled()
  })
})
