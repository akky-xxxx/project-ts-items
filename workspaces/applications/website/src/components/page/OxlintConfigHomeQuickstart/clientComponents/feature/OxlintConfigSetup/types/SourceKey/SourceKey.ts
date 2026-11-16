import type { SWITCH_NAMES } from "../../constants/SWITCH_NAMES/SWITCH_NAMES.ts"
import type { Base } from "../Base/Base.ts"

/** スイッチ名の並びから `&<スイッチ名>=<boolean>` を順に連結した型を作る */
type SwitchPart<Names> = Names extends readonly [infer Head extends string, ...infer Rest]
  ? `&${Head}=${boolean}${SwitchPart<Rest>}`
  : ""

/** ベースとスイッチの状態を表すキー(例: `ts&typeAwareLinting=true&storybook=false`) */
export type SourceKey = `${Base}${SwitchPart<typeof SWITCH_NAMES>}`
