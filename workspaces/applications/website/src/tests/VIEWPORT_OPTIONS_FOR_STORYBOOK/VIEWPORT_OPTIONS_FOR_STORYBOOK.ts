import type { ViewportMap } from "storybook/viewport"

/**
 * @description
 * storybook 向けの定数。src/app/[locale]/presets.css の custom media(--small / --medium / --large)に対応する viewport
 * (CSS の値は TS から読み込めないため、ブレークポイントを変更した場合はこちらも合わせる)
 * large は addon-vitest が viewport 未指定時に使う 1200x900 と揃える
 */
export const VIEWPORT_OPTIONS_FOR_STORYBOOK = {
  large: { name: "Large", styles: { height: "900px", width: "1200px" }, type: "desktop" },
  medium: { name: "Medium", styles: { height: "1112px", width: "834px" }, type: "tablet" },
  small: { name: "Small", styles: { height: "812px", width: "375px" }, type: "mobile" },
} as const satisfies ViewportMap
