import type { Translation } from "../Translation/Translation.ts"

/** 辞書の型から、1つの locale 分のメッセージ(末端が文字列)の型を作る */
export type LocaleMessages<Source> = {
  readonly [Key in keyof Source]: Source[Key] extends Translation
    ? string
    : LocaleMessages<Source[Key]>
}
