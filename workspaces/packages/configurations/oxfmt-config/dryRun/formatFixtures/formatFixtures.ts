import { preparePackedPackage, runCommand } from "@ts-items/configurations/dryRun"

interface FormatResult {
  actual: string
  expected: string
}

type FormatFixture = (option: string, file: string) => Promise<FormatResult>

const SUCCESS_EXIT_CODE = 0

const CONSUMER_CONFIG = `
import { baseConfig } from "@ts-items/oxfmt-config"

export default baseConfig
`

/**
 * @description
 * pack した `@ts-items/oxfmt-config` を利用者と同じ形で読み込み、fixture を整形する。
 * 戻り値の関数で `fixtures/<option>/input/<file>` を整形した結果(actual)と
 * `fixtures/<option>/output/<file>` の内容(expected)を取得できる
 */
export const formatFixtures = async (): Promise<FormatFixture> => {
  const workDirectory = await preparePackedPackage({
    copyDirectories: [],
    files: { "oxfmt.config.mts": CONSUMER_CONFIG },
    packageDirectory: `${import.meta.dir}/../..`,
    packageName: "@ts-items/oxfmt-config",
  })
  const fixturesDirectory = `${import.meta.dir}/../baseConfig/fixtures`

  return async (option, file) => {
    const [input, expected] = await Promise.all([
      Bun.file(`${fixturesDirectory}/${option}/input/${file}`).text(),
      Bun.file(`${fixturesDirectory}/${option}/output/${file}`).text(),
    ])
    const { exitCode, stderr, stdout } = await runCommand(
      [
        "bun",
        "x",
        "--no-install",
        "oxfmt",
        "--config=oxfmt.config.mts",
        `--stdin-filepath=${file}`,
      ],
      workDirectory,
      input,
    )
    if (exitCode !== SUCCESS_EXIT_CODE) {
      throw new Error(`failed to format ${option}/${file}:\n${stderr}`)
    }
    return { actual: stdout, expected }
  }
}
