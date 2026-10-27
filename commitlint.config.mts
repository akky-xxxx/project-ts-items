import { RuleConfigSeverity } from "@commitlint/types"

import { directories } from "./configurations/commitlint/directories/index.mts"

import type { UserConfig } from "@commitlint/types"

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["chore", "feat", "fix", "docs", "style", "refactor", "test", "revert"],
    ],
    "scope-enum": [RuleConfigSeverity.Error, "always", directories],
    "scope-empty": [RuleConfigSeverity.Error, "never"],
    "body-leading-blank": [RuleConfigSeverity.Error, "always"],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", Infinity],
  },
}

export default Configuration
