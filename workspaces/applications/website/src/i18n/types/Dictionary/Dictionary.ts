import type { Translation } from "../Translation/Translation.ts"

/** Namespace を入れ子にでき、末端に全 locale の文言(Translation)を持つ辞書 */
export interface Dictionary {
  readonly [key: string]: Dictionary | Translation
}
