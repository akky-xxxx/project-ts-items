export type Target = "base" | "next" | "react" | "storybook"

/**
 * @description
 * 各 target で利用者が extends する設定。storybookConfig は override のみを持つため、利用時と同じく baseConfig と組み合わせる
 */
const CONSUMER_CONFIG_NAMES = {
  base: ["baseConfig"],
  next: ["nextConfig"],
  react: ["reactConfig"],
  storybook: ["baseConfig", "storybookConfig"],
} as const satisfies Record<Target, readonly string[]>

/**
 * @description
 * target の設定を extends する利用者側の oxlint 設定ファイルの内容を生成する
 */
export const createConsumerConfig = (target: Target): string => {
  const configNames = CONSUMER_CONFIG_NAMES[target].join(", ")

  return `
import { ${configNames} } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [${configNames}],
  options: {
    typeAware: true,
  },
})
`
}
