interface CommandResult {
  exitCode: number
  stderr: string
  stdout: string
}

type RunCommand = (
  command: readonly string[],
  cwd: string,
  stdin?: string,
) => Promise<CommandResult>

export const runCommand: RunCommand = async (command, cwd, stdin = "") => {
  const subprocess = Bun.spawn([...command], {
    cwd,
    stderr: "pipe",
    stdin: new Response(stdin),
    stdout: "pipe",
  })
  const [exitCode, stderr, stdout] = await Promise.all([
    subprocess.exited,
    new Response(subprocess.stderr).text(),
    new Response(subprocess.stdout).text(),
  ])
  return { exitCode, stderr, stdout }
}
