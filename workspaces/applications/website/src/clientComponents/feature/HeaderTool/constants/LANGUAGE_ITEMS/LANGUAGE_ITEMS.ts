import type { Locale } from "../../../../../i18n/types/Locale/Locale.ts"
import type { OptionSwitcher } from "../../../OptionSwitcher/OptionSwitcher.tsx"
import type { ComponentProps } from "react"

export const LANGUAGE_ITEMS = [
  {
    labelText: "English",
    value: "en" satisfies Locale,
  },
  {
    labelText: "日本語",
    value: "ja" satisfies Locale,
  },
] as const satisfies ComponentProps<typeof OptionSwitcher>["items"]
