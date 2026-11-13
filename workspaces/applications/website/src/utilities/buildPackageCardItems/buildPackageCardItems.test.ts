import { createTranslator } from "next-intl"
import { describe, expect, it } from "vitest"

import { siteDictionary } from "../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { buildPackageCardItems } from "./buildPackageCardItems.ts"

const messages = toLocaleMessages(siteDictionary, "en")

const buildItems = () =>
  buildPackageCardItems({
    packageCardTranslate: createTranslator({
      locale: "en",
      messages,
      namespace: "components.ui.packageCard",
    }),
    packageTranslate: createTranslator({ locale: "en", messages, namespace: "packages" }),
  })

describe("buildPackageCardItems", () => {
  it("oxlint-config と oxfmt-config の順に2件を返す", () => {
    expect(buildItems().map((item) => item.packageNameText)).toStrictEqual([
      "@ts-items/oxlint-config",
      "@ts-items/oxfmt-config",
    ])
  })

  it("各パッケージの詳細ページへのリンク先を返す", () => {
    expect(buildItems().map((item) => item.innerLinkHref)).toStrictEqual([
      "/packages/oxlint-config",
      "/packages/oxfmt-config",
    ])
  })

  it("見出しを h2 にする", () => {
    expect(buildItems().map((item) => item.headingTag)).toStrictEqual(["h2", "h2"])
  })

  it("linkText に翻訳済みの文言を渡す", () => {
    expect(buildItems().map((item) => item.linkText)).toStrictEqual(["Documents", "Documents"])
  })
})
