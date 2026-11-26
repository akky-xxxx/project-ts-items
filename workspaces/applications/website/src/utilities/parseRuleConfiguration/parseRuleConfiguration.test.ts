import { baseConfig } from "@ts-items/oxlint-config"
import { describe, it, expect } from "vitest"

import { parseRuleConfiguration } from "./parseRuleConfiguration.ts"

const FIXTURE_CASES = [
  {
    expected: { descriptionBase: undefined, originOption: undefined, severity: "warn" },
    ruleValue: "warn",
    title: "ルールの値が配列でない時、値を severity とし、オプションを undefined にする",
  },
  {
    expected: { descriptionBase: undefined, originOption: undefined, severity: "error" },
    ruleValue: ["error"],
    title: "配列に severity しか無い時、オプションを undefined にする",
  },
  {
    expected: { descriptionBase: { "": 3 }, originOption: 3, severity: 1 },
    ruleValue: [1, 3],
    title: "オプションが number の時、空文字のキーに入れる",
  },
  {
    expected: {
      descriptionBase: { "allow.0": "foo", "allow.1": "bar", "nested.max": 10 },
      originOption: { allow: ["foo", "bar"], nested: { max: 10 } },
      severity: "error",
    },
    ruleValue: ["error", { allow: ["foo", "bar"], nested: { max: 10 } }],
    title: "オプションが object の時、ネストしたキーをドット区切りで平坦化する",
  },
  {
    expected: {
      descriptionBase: { "0": "asc", "1.flag": true },
      originOption: ["asc", { flag: true }],
      severity: "warn",
    },
    ruleValue: ["warn", "asc", { flag: true }],
    title: "オプションが複数ある時、severity を除いた配列として保持する",
  },
] as const

const BASE_CONFIG_CASES = [
  {
    expected: {
      descriptionBase: { "": "as-needed" },
      originOption: "as-needed",
      severity: "error",
    },
    ruleName: "eslint/arrow-body-style",
    title: "文字列のオプションを空文字のキーと originOption に保持する",
  },
  {
    expected: { descriptionBase: undefined, originOption: undefined, severity: "error" },
    ruleName: "eslint/no-use-before-define",
    title: "オプションの無いルールはオプションを undefined にする",
  },
  {
    expected: {
      descriptionBase: { "0": "asc", "1.allowLineSeparatedGroups": true },
      originOption: ["asc", { allowLineSeparatedGroups: true }],
      severity: "warn",
    },
    ruleName: "eslint/sort-keys",
    title: "複数のオプションを持つルールは方向とオプションオブジェクトの両方を保持する",
  },
] as const

describe(parseRuleConfiguration, () => {
  it.each(FIXTURE_CASES)("$title", (testCase) => {
    expect(
      parseRuleConfiguration({ "sample/rule": testCase.ruleValue }, "sample/rule"),
    ).toStrictEqual({ ...testCase.expected, ruleName: "sample/rule" })
  })

  describe("baseConfig のルールを渡した時", () => {
    it.each(BASE_CONFIG_CASES)("$title($ruleName)", (testCase) => {
      expect(parseRuleConfiguration(baseConfig.rules, testCase.ruleName)).toStrictEqual({
        ...testCase.expected,
        ruleName: testCase.ruleName,
      })
    })
  })
})
