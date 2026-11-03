import { dictionaryDefinitions } from "../dictionaryDefinitions/dictionaryDefinitions.mts"

import type { CSpellUserSettings } from "cspell"

type GetDictionarySetting = (
  names: (keyof typeof dictionaryDefinitions)[],
) => Pick<CSpellUserSettings, "dictionaryDefinitions" | "dictionaries">

export const getDictionarySetting: GetDictionarySetting = (names) => {
  const dictionaries = names.map((name) => dictionaryDefinitions[name])
  return {
    dictionaries: names,
    dictionaryDefinitions: dictionaries,
  }
}
