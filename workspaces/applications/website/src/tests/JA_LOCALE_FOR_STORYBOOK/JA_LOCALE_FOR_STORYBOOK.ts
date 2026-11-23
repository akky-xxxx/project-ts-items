/**
 * @description
 * storybook 向けの定数
 */
export const JA_LOCALE_FOR_STORYBOOK = {
  globals: {
    locale: "ja",
  },
  parameters: {
    nextjs: {
      navigation: {
        segments: [["locale", "ja"]],
      },
    },
  },
} as const
