import { routing } from "../routing/routing.ts"

import type { Dictionary } from "../Dictionary/Dictionary.ts"
import type { Locale } from "../Locale/Locale.ts"
import type { LocaleMessages } from "../LocaleMessages/LocaleMessages.ts"
import type { Translation } from "../Translation/Translation.ts"

const isTranslation = (value: Dictionary | Translation): value is Translation =>
  routing.locales.every((locale) => typeof value[locale] === "string")

/**
 * @description
 * 全 locale の文言を持つ辞書を、指定した locale の文言だけを持つメッセージ(next-intl が受け取る形)に変換する
 */
export const toLocaleMessages = <Source extends Dictionary>(
  dictionary: Source,
  locale: Locale,
): LocaleMessages<Source> =>
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- TS cannot infer the recursive mapped type from Object.fromEntries; the runtime shape is covered by tests
  Object.fromEntries(
    Object.entries(dictionary).map(([key, value]) => [
      key,
      isTranslation(value) ? value[locale] : toLocaleMessages(value, locale),
    ]),
  ) as LocaleMessages<Source>
