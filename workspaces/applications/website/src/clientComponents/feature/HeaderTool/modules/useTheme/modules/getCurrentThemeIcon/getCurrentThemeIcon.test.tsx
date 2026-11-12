import { describe, expect, it } from "vitest"

import { GearIcon } from "../../../../../../../components/icons/GearIcon/GearIcon.tsx"
import { MoonIcon } from "../../../../../../../components/icons/MoonIcon/MoonIcon.tsx"
import { SunIcon } from "../../../../../../../components/icons/SunIcon/SunIcon.tsx"
import { THEME_SWITCHER_ICON_PROPS } from "../../../../constants/THEME_SWITCHER_ICON_PROPS/THEME_SWITCHER_ICON_PROPS.ts"
import { getCurrentThemeIcon } from "./getCurrentThemeIcon.tsx"

type Theme = Parameters<typeof getCurrentThemeIcon>[0]["theme"]
type TestCase = [Theme, string, unknown]

const TEXTS = {
  darkThemeText: "{darkThemeText}",
  lightThemeText: "{lightThemeText}",
  systemThemeText: "{systemThemeText}",
} as const

describe("getCurrentThemeIcon", () => {
  it.each([
    ["dark", TEXTS.darkThemeText, MoonIcon],
    ["light", TEXTS.lightThemeText, SunIcon],
    ["system", TEXTS.systemThemeText, GearIcon],
  ] as const satisfies TestCase[])(
    "getCurrentThemeIcon({ theme: %s }) // aria-label: %s",
    (theme, expectedLabel, expectedIcon) => {
      const iconElement = getCurrentThemeIcon({ ...TEXTS, theme })

      expect(iconElement.type).toBe(expectedIcon)
      expect(iconElement.props).toStrictEqual({
        ...THEME_SWITCHER_ICON_PROPS,
        "aria-label": expectedLabel,
        "role": "img",
      })
    },
  )
})
