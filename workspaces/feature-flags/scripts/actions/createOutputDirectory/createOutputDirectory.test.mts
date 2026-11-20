import { afterAll, describe, expect, it } from "bun:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import { createOutputDirectory } from "./createOutputDirectory.mts"

const temporaryDirectories: string[] = []

const prepareTemporaryDirectory = () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "create-output-directory-"))
  temporaryDirectories.push(temporaryDirectory)
  return temporaryDirectory
}

afterAll(() => {
  for (const temporaryDirectory of temporaryDirectories) {
    fs.rmSync(temporaryDirectory, { force: true, recursive: true })
  }
})

describe("createOutputDirectory", () => {
  it("存在しない多階層のディレクトリを作成する", () => {
    const outputDirectory = path.join(prepareTemporaryDirectory(), "dist/website/stg")

    createOutputDirectory(outputDirectory)

    expect(fs.statSync(outputDirectory).isDirectory()).toBe(true)
  })

  it("ディレクトリが既に存在する場合は、エラーにせず中身を保持する", () => {
    const outputDirectory = path.join(prepareTemporaryDirectory(), "dist/website/stg")
    const existingFile = path.join(outputDirectory, "featureFlag.json")
    fs.mkdirSync(outputDirectory, { recursive: true })
    fs.writeFileSync(existingFile, "{}")

    createOutputDirectory(outputDirectory)

    expect(fs.readFileSync(existingFile, "utf8")).toBe("{}")
  })
})
