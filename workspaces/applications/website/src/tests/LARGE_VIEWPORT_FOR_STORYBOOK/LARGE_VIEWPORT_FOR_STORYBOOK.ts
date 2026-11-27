/**
 * @description
 * storybook 向けの定数。viewport を large(src/app/[locale]/presets.css の --large)にする
 */
export const LARGE_VIEWPORT_FOR_STORYBOOK = {
  globals: {
    viewport: { value: "large" },
  },
} as const
