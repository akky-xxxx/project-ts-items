/**
 * @description
 * storybook 向けの定数
 */
export const EN_LOCALE_FOR_STORYBOOK = {
  globals: {
    locale: "en",
  },
  parameters: {
    nextjs: {
      navigation: {
        segments: [["locale", "en"]],
      },
    },
  },
} as const
