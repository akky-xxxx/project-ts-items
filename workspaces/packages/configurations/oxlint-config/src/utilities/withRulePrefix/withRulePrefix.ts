export const withRulePrefix = <const Prefix extends string, Value>(
  prefix: Prefix,
  rules: Record<string, Value>,
): Record<`${Prefix}/${string}`, Value> => {
  const result: Record<string, Value> = {}

  for (const [name, value] of Object.entries(rules)) {
    result[`${prefix}/${name}`] = value
  }

  return result
}
