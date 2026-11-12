import { GearIcon } from "../../../../../../../components/icons/GearIcon/GearIcon.tsx"
import { MoonIcon } from "../../../../../../../components/icons/MoonIcon/MoonIcon.tsx"
import { SunIcon } from "../../../../../../../components/icons/SunIcon/SunIcon.tsx"
import { THEME_SWITCHER_ICON_PROPS } from "../../../../constants/THEME_SWITCHER_ICON_PROPS/THEME_SWITCHER_ICON_PROPS.ts"

import type { themeSchema } from "../../../../../../../schemas/themeSchema/themeSchema.ts"
import type * as z from "zod/mini"

interface Input {
  darkThemeText: string
  lightThemeText: string
  systemThemeText: string
  theme: z.output<typeof themeSchema>
}

/**
 * @description
 * テーマ切り替えボタン用のアイコンを返す。ボタンの中身はアイコンだけなので、アイコンにアクセシブルネームを持たせる
 */
export const getCurrentThemeIcon = (input: Input) => {
  const { darkThemeText, lightThemeText, systemThemeText, theme } = input
  const iconProps = {
    ...THEME_SWITCHER_ICON_PROPS,
    role: "img",
  } as const

  switch (theme) {
    case "dark": {
      return <MoonIcon aria-label={darkThemeText} {...iconProps} />
    }
    case "light": {
      return <SunIcon aria-label={lightThemeText} {...iconProps} />
    }
    case "system": {
      return <GearIcon aria-label={systemThemeText} {...iconProps} />
    }
    default: {
      return theme satisfies never
    }
  }
}
