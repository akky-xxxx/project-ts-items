import { baseConfig } from "@ts-items/oxlint-config"

import { parseRuleConfiguration } from "../../../../../utilities/parseRuleConfiguration/parseRuleConfiguration.ts"
import { categorySchema } from "../../schema/categorySchema/categorySchema.ts"

import type * as z from "zod/mini"

type Category = z.output<typeof categorySchema>

const FIRST_CHARACTER_INDEX = 0
const allRules = Object.keys(baseConfig.rules).map((ruleName) =>
  parseRuleConfiguration(baseConfig.rules, ruleName),
)
type OxlintConfigBaseRuleDetailsRecord = Record<Category, typeof allRules>
type CreateBaseConfigRuleDetails = () => OxlintConfigBaseRuleDetailsRecord

/** reduce で破壊的に push するため、呼び出しごとに新しい object を作る */
const createInitialValue = (): OxlintConfigBaseRuleDetailsRecord => ({
  eslint: [],
  import: [],
  oxc: [],
  typescript: [],
  unicorn: [],
})

export const createBaseConfigRuleDetails: CreateBaseConfigRuleDetails = () =>
  allRules.reduce<OxlintConfigBaseRuleDetailsRecord>((previousValue, currentValue) => {
    const category = currentValue.ruleName.slice(
      FIRST_CHARACTER_INDEX,
      currentValue.ruleName.indexOf("/"),
    )

    const parsedResult = categorySchema.safeParse(category)

    if (parsedResult.success) {
      previousValue[parsedResult.data].push(currentValue)
    }

    return previousValue
  }, createInitialValue())
