import { describe, expect, it } from "bun:test"

import { preparePackedPackage } from "./preparePackedPackage.mts"

const EXAMPLE_PACKAGE_DIRECTORY = `${import.meta.dir}/fixtures/examplePackage`
const PACKAGE_NAME = "@example/package"

const prepare = async (files: Readonly<Record<string, string>> = {}) =>
  preparePackedPackage({
    copyDirectories: ["copied"],
    files,
    packageDirectory: EXAMPLE_PACKAGE_DIRECTORY,
    packageName: PACKAGE_NAME,
  })

const listFiles = async (directory: string) => {
  const files = await Array.fromAsync(new Bun.Glob("**/*").scan({ cwd: directory }))
  return files.toSorted()
}

describe("preparePackedPackage", () => {
  it("<packageDirectory>/.dry-run を返す", async () => {
    expect(await prepare()).toBe(`${EXAMPLE_PACKAGE_DIRECTORY}/.dry-run`)
  })

  it("node_modules/<packageName> に files の対象と package.json だけが展開される", async () => {
    const workDirectory = await prepare()

    expect(await listFiles(`${workDirectory}/node_modules/${PACKAGE_NAME}`)).toEqual([
      "lib/index.js",
      "package.json",
    ])
  })

  it("files に渡した内容が書き出される", async () => {
    const workDirectory = await prepare({ "nested/file.txt": "nested", "root.txt": "root" })

    expect(await Bun.file(`${workDirectory}/nested/file.txt`).text()).toBe("nested")
    expect(await Bun.file(`${workDirectory}/root.txt`).text()).toBe("root")
  })

  it("copyDirectories に渡したディレクトリがコピーされる", async () => {
    const workDirectory = await prepare()

    expect(await Bun.file(`${workDirectory}/copied/file.txt`).text()).toBe("copied\n")
  })

  it("再実行すると前回の作業ディレクトリの中身は消える", async () => {
    await prepare({ "previous.txt": "previous" })
    const workDirectory = await prepare()

    expect(await Bun.file(`${workDirectory}/previous.txt`).exists()).toBe(false)
  })

  it("pack に失敗した場合は失敗したコマンドを含むエラーで reject される", async () => {
    const error: unknown = await preparePackedPackage({
      copyDirectories: [],
      files: {},
      packageDirectory: `${import.meta.dir}/fixtures/invalidPackage`,
      packageName: "@example/invalid-package",
    }).catch((error_: unknown) => error_)

    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty("message", expect.stringContaining("failed: bun pm pack"))
  })
})
