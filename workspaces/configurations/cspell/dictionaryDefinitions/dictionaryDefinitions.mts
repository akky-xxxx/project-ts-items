import type { DictionaryDefinition } from "cspell"

const dictionaryNames = ["packages"] as const

type DictionaryName = (typeof dictionaryNames)[number]
type DictionaryDefinitions = Record<DictionaryName, DictionaryDefinition>

const createDictionaryDefinition = (
  previousValue: DictionaryDefinitions,
  currentValue: DictionaryName,
) => {
  const nextValue = { ...previousValue }
  nextValue[currentValue] = {
    name: currentValue,
    path: import.meta.resolve(`../${currentValue}.txt`),
  }
  return nextValue
}

export const dictionaryDefinitions = dictionaryNames.reduce(
  createDictionaryDefinition,
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  {} as DictionaryDefinitions,
)
