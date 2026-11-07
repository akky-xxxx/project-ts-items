import { describe, expect, it } from "vitest"

import { toLocaleMessages } from "./toLocaleMessages.ts"

describe("toLocaleMessages", () => {
  it("末端の文言を指定した locale の文字列に置き換える", () => {
    const dictionary = { greeting: { en: "Hello", ja: "こんにちは" } }

    expect(toLocaleMessages(dictionary, "en")).toStrictEqual({ greeting: "Hello" })
    expect(toLocaleMessages(dictionary, "ja")).toStrictEqual({ greeting: "こんにちは" })
  })

  it("入れ子の namespace を保ったまま末端を置き換える", () => {
    const dictionary = {
      HomePage: { greeting: { en: "Hello", ja: "こんにちは" } },
      Metadata: { title: { en: "Title", ja: "タイトル" } },
    }

    expect(toLocaleMessages(dictionary, "ja")).toStrictEqual({
      HomePage: { greeting: "こんにちは" },
      Metadata: { title: "タイトル" },
    })
  })

  it("locale と同名のキーを持つ namespace は末端として扱わない", () => {
    const dictionary = {
      en: { label: { en: "English", ja: "英語" } },
      ja: { label: { en: "Japanese", ja: "日本語" } },
    }

    expect(toLocaleMessages(dictionary, "en")).toStrictEqual({
      en: { label: "English" },
      ja: { label: "Japanese" },
    })
  })

  it("空の辞書は空のメッセージになる", () => {
    expect(toLocaleMessages({}, "en")).toStrictEqual({})
  })
})
