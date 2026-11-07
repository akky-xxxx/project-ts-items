import type { Locale } from "../Locale/Locale.ts"

/** 1つのキーに対する全 locale の文言 */
export type Translation = Readonly<Record<Locale, string>>
