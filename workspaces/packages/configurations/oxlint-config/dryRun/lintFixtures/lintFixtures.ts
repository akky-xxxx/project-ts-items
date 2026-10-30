import { preparePackedPackage, runCommand } from "@ts-items/configurations/dryRun"

type Severity = "error" | "none" | "warning"

interface Diagnostic {
  code: string
  filename: string
  severity: Exclude<Severity, "none">
}

interface LintResult {
  diagnostics: Diagnostic[]
}

interface Parameters {
  /** `dryRun/` からの相対パス */
  fixturesDirectory: string
  target: "base" | "react"
}

type GetSeverity = (code: string, fixture: string) => Severity

const isLintResult = (value: unknown): value is LintResult =>
  typeof value === "object" &&
  value !== null &&
  "diagnostics" in value &&
  Array.isArray(value.diagnostics)

const createConsumerConfig = (configName: string): string => `
import { ${configName} } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [${configName}],
  options: {
    typeAware: true,
  },
})
`

const TSCONFIG = JSON.stringify({
  compilerOptions: {
    allowImportingTsExtensions: true,
    allowJs: true,
    jsx: "react-jsx",
    module: "Preserve",
    moduleResolution: "bundler",
    noEmit: true,
    strict: true,
    target: "ESNext",
  },
  include: ["dryRun"],
})

/**
 * @description
 * pack した `@ts-items/oxlint-config` を利用者と同じ形で読み込み、fixture を lint する。
 * 戻り値の関数で「fixture にルール(code)の診断がどの severity で出たか」を取得できる
 */
export const lintFixtures = async (parameters: Parameters): Promise<GetSeverity> => {
  const { fixturesDirectory, target } = parameters
  const workDirectory = await preparePackedPackage({
    copyDirectories: ["dryRun"],
    files: {
      "oxlint.base.config.mts": createConsumerConfig("baseConfig"),
      "oxlint.react.config.mts": createConsumerConfig("reactConfig"),
      "tsconfig.json": TSCONFIG,
    },
    packageDirectory: `${import.meta.dir}/../..`,
    packageName: "@ts-items/oxlint-config",
  })
  // 作業ディレクトリ(.dry-run)は隠しディレクトリかつ .gitignore 対象で oxlint のディレクトリ走査から外れるため、ファイルを列挙して渡す
  const fixtures = await Array.fromAsync(
    new Bun.Glob(`dryRun/${fixturesDirectory}/**/*`).scan({ cwd: workDirectory }),
  )
  const { stdout } = await runCommand(
    [
      "bun",
      "x",
      "--no-install",
      "oxlint",
      `--config=oxlint.${target}.config.mts`,
      "--format=json",
      "--no-ignore",
      ...fixtures,
    ],
    workDirectory,
  )
  const result: unknown = JSON.parse(stdout)
  if (!isLintResult(result)) {
    throw new Error(`unexpected oxlint output:\n${stdout}`)
  }

  return (code, fixture) =>
    result.diagnostics.find(
      (diagnostic) =>
        diagnostic.code === code &&
        diagnostic.filename === `dryRun/${fixturesDirectory}/${fixture}`,
    )?.severity ?? "none"
}
