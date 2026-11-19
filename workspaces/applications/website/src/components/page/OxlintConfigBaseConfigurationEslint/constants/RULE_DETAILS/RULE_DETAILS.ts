import { parseRuleConfiguration } from "./modules/parseRuleConfiguration/parseRuleConfiguration.ts"

export const RULE_DETAILS = [
  parseRuleConfiguration("eslint/arrow-body-style"),
  parseRuleConfiguration("eslint/complexity"),
  parseRuleConfiguration("eslint/curly"),
  parseRuleConfiguration("eslint/id-length"),
] as const
