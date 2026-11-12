import { startTransition, useCallback, useState } from "react"

import { GearIcon } from "../../../../../components/icons/GearIcon/GearIcon.tsx"
import { MoonIcon } from "../../../../../components/icons/MoonIcon/MoonIcon.tsx"
import { SunIcon } from "../../../../../components/icons/SunIcon/SunIcon.tsx"
import { themeSchema } from "../../../../../schemas/themeSchema/themeSchema.ts"
import { setTheme } from "../../actions/SetTheme/SetTheme.ts"
import { THEME_SWITCHER_ICON_PROPS } from "../../constants/THEME_SWITCHER_ICON_PROPS/THEME_SWITCHER_ICON_PROPS.ts"
import { getCurrentThemeIcon } from "./modules/getCurrentThemeIcon/getCurrentThemeIcon.tsx"

import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"
import type * as z from "zod/mini"

type Input = {
  darkThemeText: string
  lightThemeText: string
  systemThemeText: string
  theme: z.output<typeof themeSchema>
}

export const useTheme = (input: Input) => {
  const { darkThemeText, lightThemeText, systemThemeText, theme } = input
  const [localTheme, setLocalTheme] = useState(theme)
  const selectTheme = useCallback((value: string) => {
    const result = themeSchema.safeParse(value)
    if (!result.success) {
      return
    }

    const { data: newTheme } = result
    document.documentElement.dataset.theme = newTheme
    startTransition(async () => {
      setLocalTheme(newTheme)
      await setTheme(newTheme)
    })
  }, [])
  const themeItems = [
    {
      iconElement: <SunIcon {...THEME_SWITCHER_ICON_PROPS} />,
      labelText: lightThemeText,
      value: "light",
    },
    {
      iconElement: <MoonIcon {...THEME_SWITCHER_ICON_PROPS} />,
      labelText: darkThemeText,
      value: "dark",
    },
    {
      iconElement: <GearIcon {...THEME_SWITCHER_ICON_PROPS} />,
      labelText: systemThemeText,
      value: "system",
    },
  ] as const satisfies ComponentProps<typeof OptionSwitcher>["items"]
  const currentThemeIcon = getCurrentThemeIcon({
    darkThemeText,
    lightThemeText,
    systemThemeText,
    theme: localTheme,
  })

  return {
    currentThemeIcon,
    localTheme,
    selectTheme,
    themeItems,
  }
}
