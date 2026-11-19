import { runCommand } from "@ts-items/configurations/dryRun"
import { afterAll, describe, expect, it } from "bun:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const FAILURE_EXIT_CODE = 1
const PACKAGE_ROOT_DIRECTORY = path.resolve(import.meta.dirname, "../../../")
const SUCCESS_EXIT_CODE = 0
const sandboxDirectories: string[] = []

const prepareSandbox = (originSource: string) => {
  const sandboxDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "feature-flags-"))
  sandboxDirectories.push(sandboxDirectory)

  for (const directory of ["scripts", "src"]) {
    fs.cpSync(
      path.join(PACKAGE_ROOT_DIRECTORY, directory),
      path.join(sandboxDirectory, directory),
      {
        recursive: true,
      },
    )
  }
  fs.copyFileSync(
    path.join(PACKAGE_ROOT_DIRECTORY, "package.json"),
    path.join(sandboxDirectory, "package.json"),
  )
  fs.symlinkSync(
    path.join(PACKAGE_ROOT_DIRECTORY, "node_modules"),
    path.join(sandboxDirectory, "node_modules"),
  )
  fs.writeFileSync(
    path.join(sandboxDirectory, "src/website/jsonOrigins/local/featureFlag.ts"),
    originSource,
  )
  return sandboxDirectory
}

const runGenerateCommand = async (sandboxDirectory: string) =>
  runCommand(["bun", "run", "gen:website-local"], sandboxDirectory)

afterAll(() => {
  for (const sandboxDirectory of sandboxDirectories) {
    fs.rmSync(sandboxDirectory, { force: true, recursive: true })
  }
})

describe("web-local", () => {
  it("パッケージ直下に、origin の feature flag を検証済みの JSON として書き出して正常終了する", async () => {
    const sandboxDirectory = prepareSandbox(
      'export const localFeatureFlag = { sampleFeature: "disabled" }\n',
    )
    const { exitCode } = await runGenerateCommand(sandboxDirectory)

    expect(exitCode).toBe(SUCCESS_EXIT_CODE)
    expect(await Bun.file(path.join(sandboxDirectory, "featureFlag.json")).text()).toBe(
      '{\n  "sampleFeature": "disabled"\n}',
    )
  })

  it("スキーマに一致しない値の場合は、原因を標準エラーに出力して終了コード 1 で終了し、JSON を書き出さない", async () => {
    const sandboxDirectory = prepareSandbox(
      'export const localFeatureFlag = { sampleFeature: "on" }\n',
    )
    const { exitCode, stderr } = await runGenerateCommand(sandboxDirectory)

    expect(exitCode).toBe(FAILURE_EXIT_CODE)
    expect(stderr).toContain("→ at sampleFeature")
    expect(await Bun.file(path.join(sandboxDirectory, "featureFlag.json")).exists()).toBe(false)
  })
})
