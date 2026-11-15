import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import path from "node:path"
import { defineConfig } from "vitest/config"

const dirname = typeof __dirname === "undefined" ? import.meta.dirname : __dirname
const storybookConfigDir = path.join(dirname, ".storybook")
/** Vitest は instances の要素に project 名を書き込むため、project ごとに新しい object を作る */
const createStorybookBrowser = (provider: ReturnType<typeof playwright>) => ({
  enabled: true,
  headless: true,
  instances: [{ browser: "chromium" as const }],
  provider,
})

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: storybookConfigDir, tags: { exclude: ["touch"] } }),
        ],
        test: {
          browser: createStorybookBrowser(playwright({})),
          name: "storybook",
        },
      },
      // タッチ端末(hover: none)のテスト(タグ touch)は、最初から hasTouch で作った browser context で実行する。
      // CDP のタッチエミュレーションは Linux の Chromium で無効化しても hover: none が戻らず、
      // 同じ page で後に実行されるテストの hover スタイルを壊すため使わない
      {
        extends: true,
        plugins: [storybookTest({ configDir: storybookConfigDir, tags: { include: ["touch"] } })],
        test: {
          browser: createStorybookBrowser(playwright({ contextOptions: { hasTouch: true } })),
          name: "storybook-touch",
        },
      },
      {
        extends: true,
        // Tsconfig の jsx: preserve(Next.js 向け)のままだと .tsx を変換できないため
        oxc: { jsx: { runtime: "automatic" } },
        test: {
          environment: "node",
          include: ["src/**/*.test.ts{,x}"],
          name: "unit",
        },
      },
    ],
  },
})
