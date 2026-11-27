/**
 * @description
 * storybook 向けの定数。viewport を medium(src/app/[locale]/presets.css の --medium)にする
 */
export const MEDIUM_VIEWPORT_FOR_STORYBOOK = {
  globals: {
    viewport: { value: "medium" },
  },
} as const
