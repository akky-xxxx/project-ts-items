import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import path from "node:path"
import { defineConfig } from "vitest/config"

import type { TestProjectInlineConfiguration } from "vitest/config"
import type { BrowserCommand } from "vitest/node"

const storybookConfigDir = path.join(import.meta.dirname, ".storybook")
/** viewport の外の座標。前のテストの hover が残らないよう、撮影前にポインターをここへ移す */
const OUTSIDE_VIEWPORT_POSITION = -1

const movePointerOutside: BrowserCommand = async (context) => {
  await context.page.mouse.move(OUTSIDE_VIEWPORT_POSITION, OUTSIDE_VIEWPORT_POSITION)
}

/**
 * 基準画像は Linux の Chromium で撮るため、ブラウザは Docker で起動した Playwright のサーバー(test:vrt:server)に接続する。
 * exposeNetwork により、Docker 内のブラウザから見た localhost への通信はホストの Vitest のサーバーに届く
 */
const createVrtProject = (input: {
  hasTouch: boolean
  name: string
  tags: { exclude: string[]; include?: string[] }
}): TestProjectInlineConfiguration => ({
  extends: true,
  plugins: [storybookTest({ configDir: storybookConfigDir, tags: input.tags })],
  test: {
    // addon-vitest が既定で無効にするため、基準画像・差分画像の書き込みに必要
    api: { allowWrite: true },
    browser: {
      commands: { movePointerOutside },
      enabled: true,
      expect: {
        toMatchScreenshot: {
          // 既定はファイル名に Vitest を実行したホストの OS 名が付き、Mac から撮っても -darwin になるため外す
          resolveScreenshotPath: ({
            arg,
            ext,
            root,
            screenshotDirectory,
            testFileDirectory,
            testFileName,
          }) =>
            path.resolve(
              root,
              testFileDirectory,
              screenshotDirectory,
              testFileName,
              `${arg}${ext}`,
            ),
        },
      },
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: playwright({
        connectOptions: { exposeNetwork: "<loopback>", wsEndpoint: "ws://127.0.0.1:3200/" },
        contextOptions: { hasTouch: input.hasTouch },
      }),
    },
    name: input.name,
  },
})

// 既定の vitest.config.mts とは分ける。Linux の基準画像と比較するため、Docker を使わない test では実行しない
export default defineConfig({
  test: {
    projects: [
      createVrtProject({
        hasTouch: false,
        name: "storybook-vrt",
        tags: { exclude: ["no-vrt", "touch"] },
      }),
      // タッチ端末のテスト(タグ touch)は、vitest.config.mts と同じく hasTouch で作った browser context で撮る
      createVrtProject({
        hasTouch: true,
        name: "storybook-vrt-touch",
        tags: { exclude: ["no-vrt"], include: ["touch"] },
      }),
    ],
    setupFiles: ["./.storybook/vitest.vrt.setup.ts"],
  },
})
