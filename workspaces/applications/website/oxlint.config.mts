import { forConfigurationFiles } from "@ts-items/configurations/oxlint"
import { nextConfig, storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

// Routing は next-intl に寄せる
const restrictedPaths = [
  { message: "next-intl の Link を使う", name: "next/link" },
  {
    importNames: ["permanentRedirect", "redirect", "usePathname", "useRouter"],
    message: "next-intl の createNavigation のものを使う",
    name: "next/navigation",
  },
]

const config = defineConfig({
  extends: [nextConfig, forConfigurationFiles, storybookConfig],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      // Font loader (next/font) の関数は大文字始まりだが constructor ではない
      files: ["src/constants/FONT_VARIABLES/FONT_VARIABLES.ts"],
      rules: {
        "eslint/new-cap": "off",
      },
    },
    {
      // Request config は next-intl の規約で default export する
      files: ["src/i18n/request.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      // Src/tests/** は stories からのみ import を許可する
      // Play 関数はアサーションが並ぶため statement 数を緩和する
      files: ["**/*.stories.tsx"],
      rules: {
        // oxlint-disable-next-line no-magic-numbers
        "eslint/max-statements": ["error", 20],
        "eslint/no-restricted-imports": ["error", { paths: restrictedPaths }],
      },
    },
  ],
  rules: {
    // Zod 公式の import スタイル(import * as z from "zod")を踏襲する
    "eslint/id-length": ["error", { exceptions: ["_", "z"], min: 2 }],
    "import/no-namespace": ["error", { ignore: ["zod", "zod/mini"] }],

    // Src/tests/** は非プロダクトコード向け
    "eslint/no-restricted-imports": [
      "error",
      {
        paths: restrictedPaths,
        patterns: [{ group: ["**/tests/**"], message: "stories からのみ import する" }],
      },
    ],
  },
})

export default config
