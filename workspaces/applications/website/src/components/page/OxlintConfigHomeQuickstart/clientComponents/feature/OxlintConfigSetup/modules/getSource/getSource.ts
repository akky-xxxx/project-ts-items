import { PACKAGE_MASTER } from "../../../../../../../../constants/PACKAGE_MASTER/PACKAGE_MASTER.ts"
import { PROJECT_NAME } from "../../../../../../../../constants/PROJECT_NAME/PROJECT_NAME.ts"
import { SWITCH_NAMES } from "../../constants/SWITCH_NAMES/SWITCH_NAMES.ts"

import type { Base } from "../../types/Base/Base.ts"
import type { FormValues } from "../../types/FormValues/FormValues.ts"
import type { SwitchName } from "../../types/SwitchName/SwitchName.ts"

type SwitchSource = {
  /** Extends に追加する設定名 */
  configurationNames: string[]
  /** Options に追加する行 */
  optionLines: string[]
}

const CONFIGURATION_NAMES = {
  next: "nextConfig",
  react: "reactConfig",
  ts: "baseConfig",
} as const satisfies Record<Base, string>

/** スイッチを有効にしたときに出力へ追加する内容 */
const SWITCH_SOURCES = {
  storybook: { configurationNames: ["storybookConfig"], optionLines: [] },
  typeAwareLinting: { configurationNames: [], optionLines: ["typeAware: true,"] },
  vitest: { configurationNames: ["vitestConfig"], optionLines: [] },
} as const satisfies Record<SwitchName, Readonly<Record<keyof SwitchSource, readonly string[]>>>

export const getSource = (formValues: FormValues) => {
  const { enabledSwitches, selectedBase } = formValues
  const enabledSources = SWITCH_NAMES.filter((switchName) => enabledSwitches[switchName]).map(
    (switchName) => SWITCH_SOURCES[switchName],
  )
  const configurationNames = [
    CONFIGURATION_NAMES[selectedBase],
    ...enabledSources.flatMap((switchSource) => switchSource.configurationNames),
  ].join(", ")
  const optionLines = enabledSources.flatMap((switchSource) => switchSource.optionLines)
  const [firstOptionLine] = optionLines

  const source = [
    `import { ${configurationNames} } from "${PROJECT_NAME}/${PACKAGE_MASTER.oxlintConfig.name}"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [${configurationNames}],`,
  ]

  if (firstOptionLine !== undefined) {
    source.push("  options: {", ...optionLines.map((optionLine) => `    ${optionLine}`), "  },")
  }

  source.push("})")

  return source.join("\n")
}
