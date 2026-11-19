import { baseConfig } from "@ts-items/oxlint-config"
import { flatten } from "flat"

type RuleName = keyof (typeof baseConfig)["rules"]

export const parseRuleConfiguration = (ruleName: RuleName) => {
  const ruleValue = baseConfig.rules[ruleName]

  if (!Array.isArray(ruleValue)) {
    return {
      ruleName,
      severity: ruleValue,
    }
  }

  const [severity, option] = ruleValue

  if (typeof option === "string" || typeof option === "number") {
    return {
      descriptionBase: { "<ROOT>": option },
      originOption: option,
      ruleName,
      severity,
    }
  }
  const formattedOption = flatten<typeof option, Record<string, unknown>>(option)
  return {
    descriptionBase: formattedOption,
    originOption: option,
    ruleName,
    severity,
  }
}
