import { RuleConfigSeverity } from "@commitlint/types"

import { directories } from "./scripts/commitlint/directories/directories.mts"

import type { UserConfig } from "@commitlint/types"

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "body-leading-blank": [RuleConfigSeverity.Error, "always"],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", Infinity],
    "scope-empty": [RuleConfigSeverity.Error, "never"],
    "scope-enum": [RuleConfigSeverity.Error, "always", directories],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["chore", "feat", "fix", "docs", "style", "refactor", "test", "revert"],
    ],
  },
}

export default Configuration
