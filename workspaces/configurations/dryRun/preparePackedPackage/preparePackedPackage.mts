import { runCommand } from "../runCommand/runCommand.mts"

interface Parameters {
  /** パッケージ直下から作業ディレクトリへそのままコピーするディレクトリ */
  copyDirectories: readonly string[]
  /** 作業ディレクトリに書き出すファイル(作業ディレクトリからの相対パス → 内容) */
  files: Readonly<Record<string, string>>
  packageDirectory: string
  packageName: string
}

const SUCCESS_EXIT_CODE = 0
const WORK_DIRECTORY_NAME = ".dry-run"

const runCommandOrThrow = async (command: readonly string[], cwd: string): Promise<string> => {
  const { exitCode, stderr, stdout } = await runCommand(command, cwd)
  if (exitCode !== SUCCESS_EXIT_CODE) {
    throw new Error(`failed: ${command.join(" ")}\n${stderr}`)
  }
  return stdout.trim()
}

/**
 * @description
 * パッケージを pack した tarball を `<packageDirectory>/.dry-run/node_modules/<packageName>` に展開し、
 * 利用者と同じ経路(files / exports)で import できる作業ディレクトリを用意する。
 * peerDependencies は作業ディレクトリの親方向の node_modules から解決される
 */
export const preparePackedPackage = async (parameters: Parameters): Promise<string> => {
  const { copyDirectories, files, packageDirectory, packageName } = parameters
  const workDirectory = `${packageDirectory}/${WORK_DIRECTORY_NAME}`
  const installDirectory = `${workDirectory}/node_modules/${packageName}`

  await runCommandOrThrow(["rm", "-rf", workDirectory], packageDirectory)
  await runCommandOrThrow(["mkdir", "-p", installDirectory], packageDirectory)
  const tarball = await runCommandOrThrow(
    ["bun", "pm", "pack", "--destination", workDirectory, "--ignore-scripts", "--quiet"],
    packageDirectory,
  )
  await runCommandOrThrow(
    ["tar", "-xzf", tarball, "-C", installDirectory, "--strip-components=1"],
    packageDirectory,
  )
  await Promise.all([
    ...copyDirectories.map(async (directory) =>
      runCommandOrThrow(["cp", "-R", directory, workDirectory], packageDirectory),
    ),
    ...Object.entries(files).map(async ([path, content]) =>
      Bun.write(`${workDirectory}/${path}`, content),
    ),
  ])

  return workDirectory
}
