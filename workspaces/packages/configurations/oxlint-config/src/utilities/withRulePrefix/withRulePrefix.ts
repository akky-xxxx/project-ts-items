import type { DummyRuleMap } from "oxlint"

type PrefixedRules<Prefix extends string, Rules extends DummyRuleMap> = {
  [Key in keyof Rules & string as `${Prefix}/${Key}`]: Rules[Key]
}

export const withRulePrefix = <const Prefix extends string, const Rules extends DummyRuleMap>(
  prefix: Prefix,
  rules: Rules,
): PrefixedRules<Prefix, Rules> => {
  const result: Record<string, unknown> = {}

  for (const [name, value] of Object.entries(rules)) {
    result[`${prefix}/${name}`] = value
  }

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- TS cannot infer key-remapped mapped types from a loop; the runtime shape is covered by tests
  return result as PrefixedRules<Prefix, Rules>
}
