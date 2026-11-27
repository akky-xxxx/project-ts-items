/**
 * @description
 * storybook 向けの定数。viewport を small(src/app/[locale]/presets.css の --small)にする
 */
export const SMALL_VIEWPORT_FOR_STORYBOOK = {
  globals: {
    viewport: { value: "small" },
  },
} as const
