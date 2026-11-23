import { createTranslator } from "next-intl"
import { describe, expect, it } from "vitest"

import { siteDictionary } from "../../i18n/constants/siteDictionary/siteDictionary.ts"
import { toLocaleMessages } from "../../i18n/utilities/toLocaleMessages/toLocaleMessages.ts"
import { buildPackageCardItems } from "./buildPackageCardItems.tsx"

const messages = toLocaleMessages(siteDictionary, "en")

const buildItems = (
  headingTag: Parameters<typeof buildPackageCardItems>[number]["headingTag"] = "h2",
) =>
  buildPackageCardItems({
    headingTag,
    packageTranslate: createTranslator({ locale: "en", messages, namespace: "packages" }),
    versionTexts: {
      "oxfmt-config": "1.0.0",
      "oxlint-config": "2.0.0",
    },
  })

describe(buildPackageCardItems, () => {
  it("oxlint-config と oxfmt-config の順に2件を返す", () => {
    expect(buildItems().map((item) => item.packageNameText)).toStrictEqual([
      "@ts-items/oxlint-config",
      "@ts-items/oxfmt-config",
    ])
  })

  it("各パッケージのバージョンを返す", () => {
    expect(buildItems().map((item) => item.versionText)).toStrictEqual(["2.0.0", "1.0.0"])
  })

  it("各パッケージの詳細ページへのリンク先を返す", () => {
    expect(buildItems().map((item) => item.innerLinkHref)).toStrictEqual([
      "/packages/oxlint-config/",
      "/packages/oxfmt-config/",
    ])
  })

  it("h2 を指定すると各カードの見出しを h2 にする", () => {
    expect(buildItems("h2").map((item) => item.headingTag)).toStrictEqual(["h2", "h2"])
  })

  it("h3 を指定すると各カードの見出しを h3 にする", () => {
    expect(buildItems("h3").map((item) => item.headingTag)).toStrictEqual(["h3", "h3"])
  })
})
