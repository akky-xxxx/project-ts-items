/* oxlint-disable vitest/require-top-level-describe, vitest/no-standalone-expect -- setup file registers hooks for every story test */
import { toast } from "react-hot-toast"
import { afterEach, expect } from "vitest"
import { commands, page } from "vitest/browser"

declare module "vitest/browser" {
  // oxlint-disable-next-line typescript/consistent-type-definitions -- module augmentation requires interface merging
  interface BrowserCommands {
    movePointerOutside: () => Promise<void>
  }
}

// play の後の状態を撮る。Storybook の UI では実行しないよう、preview ではなく VRT 用の setup に置く
afterEach(async () => {
  // react-hot-toast の toast は表示時間・表示中のアニメーションにより撮るたびに変わるため、撮影前に消す
  // (消えたことは、Toaster のルート要素(react-hot-toast が data-rht-toaster を付ける)配下の role="status" で確かめる)
  toast.removeAll()
  await expect.poll(() => document.querySelector('[data-rht-toaster] [role="status"]')).toBeNull()
  await commands.movePointerOutside()
  await document.fonts.ready
  // document.fonts.ready は読み込みに失敗したフォントでも解決するため、代替フォントの画像を基準にしないよう撮影前に失敗させる
  const failedFontFamilies = [...document.fonts]
    .filter((fontFace) => fontFace.status === "error")
    .map((fontFace) => fontFace.family)
  expect(failedFontFamilies, "Web フォントを読み込めなかった").toStrictEqual([])
  await expect(page.elementLocator(document.body)).toMatchScreenshot()
})
