import { describe, expect, it } from "bun:test"

import { runCommand } from "./runCommand.mts"

const SUCCESS_EXIT_CODE = 0

describe("runCommand", () => {
  it("stdout / stderr / exitCode を返す", async () => {
    const result = await runCommand(["sh", "-c", "echo out; echo err >&2; exit 3"], import.meta.dir)

    expect(result).toEqual({ exitCode: 3, stderr: "err\n", stdout: "out\n" })
  })

  it("exitCode が 0 のときは 0 を返す", async () => {
    const { exitCode } = await runCommand(["true"], import.meta.dir)

    expect(exitCode).toBe(SUCCESS_EXIT_CODE)
  })

  it("指定した cwd で実行される", async () => {
    const { stdout } = await runCommand(["pwd", "-P"], import.meta.dir)
    const { stdout: expected } = await runCommand(
      ["sh", "-c", `cd ${import.meta.dir} && pwd -P`],
      "/",
    )

    expect(stdout).toBe(expected)
  })

  it("stdin を渡せる", async () => {
    const { stdout } = await runCommand(["cat"], import.meta.dir, "input")

    expect(stdout).toBe("input")
  })

  it("stdin を省略すると空入力になる", async () => {
    const { stdout } = await runCommand(["cat"], import.meta.dir)

    expect(stdout).toBe("")
  })
})
