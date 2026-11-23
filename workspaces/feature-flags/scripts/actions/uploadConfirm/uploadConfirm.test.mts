import { afterEach, describe, expect, it, mock } from "bun:test"

const confirmMock = mock<() => Promise<boolean>>().mockResolvedValue(true)
const selectMock = mock<() => Promise<string>>().mockResolvedValue("stg")

await mock.module("@inquirer/prompts", () => ({
  confirm: confirmMock,
  select: selectMock,
}))

const { uploadConfirm } = await import("./uploadConfirm.mts")

afterEach(() => {
  confirmMock.mockClear()
  selectMock.mockClear()
})

describe("uploadConfirm", () => {
  it("選択した環境と確認結果を返す", async () => {
    selectMock.mockResolvedValueOnce("prd")
    confirmMock.mockResolvedValueOnce(true)

    expect(await uploadConfirm()).toEqual({ environment: "prd", isConfirmed: true })
  })

  it("確認で拒否した場合は isConfirmed に false を返す", async () => {
    selectMock.mockResolvedValueOnce("stg")
    confirmMock.mockResolvedValueOnce(false)

    expect(await uploadConfirm()).toEqual({ environment: "stg", isConfirmed: false })
  })

  it("環境の選択肢として Staging(stg)と Production(prd)を提示する", async () => {
    await uploadConfirm()

    expect(selectMock).toHaveBeenCalledWith({
      choices: [
        { name: "Staging", value: "stg" },
        { name: "Production", value: "prd" },
      ],
      message: "アップロード先の環境を選択",
    })
  })

  it("選択した環境名を含むメッセージで、既定値を false にして確認する", async () => {
    selectMock.mockResolvedValueOnce("prd")

    await uploadConfirm()

    expect(confirmMock).toHaveBeenCalledWith({
      default: false,
      message: "prd にアップロードしますか？",
    })
  })
})
