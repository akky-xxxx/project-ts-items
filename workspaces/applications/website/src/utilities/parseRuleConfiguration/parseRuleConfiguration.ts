import { flatten } from "flat"

type OutputWithOptions = {
  descriptionBase: Record<string, unknown>
  originOption: unknown
  ruleName: string
  severity: unknown
}
type OutputWithoutOptions = {
  descriptionBase: undefined
  originOption: undefined
  ruleName: string
  severity: unknown
}

const NO_OPTIONS_LENGTH = 0
const SINGLE_OPTION_LENGTH = 1
const FIRST_OPTION_INDEX = 0

/** プリミティブはキーを持たないため、空文字のキーに入れる */
const createDescriptionBase = (option: unknown): Record<string, unknown> => {
  if (typeof option !== "object" || option === null) {
    return { "": option }
  }

  return flatten<typeof option, Record<string, unknown>>(option)
}

export const parseRuleConfiguration = <RuleName extends string>(
  rules: Record<string, unknown>,
  ruleName: RuleName,
) => {
  const ruleValue = rules[ruleName]
  const ruleValues: unknown[] = Array.isArray(ruleValue) ? ruleValue : [ruleValue]
  const [severity, ...options] = ruleValues

  if (options.length === NO_OPTIONS_LENGTH) {
    return {
      descriptionBase: undefined,
      originOption: undefined,
      ruleName,
      severity,
    } satisfies OutputWithoutOptions
  }

  // オプションが複数ある時(例: sort-keys の方向とオブジェクト)は、severity を除いた配列のまま保持する
  const originOption =
    options.length === SINGLE_OPTION_LENGTH ? options[FIRST_OPTION_INDEX] : options

  return {
    descriptionBase: createDescriptionBase(originOption),
    originOption,
    ruleName,
    severity,
  } satisfies OutputWithOptions
}
