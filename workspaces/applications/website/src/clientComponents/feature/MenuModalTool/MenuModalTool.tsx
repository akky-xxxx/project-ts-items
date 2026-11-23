"use client"

import { LANGUAGE_ITEMS } from "../../../constants/LANGUAGE_ITEMS/LANGUAGE_ITEMS.ts"
import { useTool } from "../../../utilities/useTool/useTool.ts"
import { OptionSwitcher } from "../OptionSwitcher/OptionSwitcher.tsx"

import type { themeSchema } from "../../../schemas/themeSchema/themeSchema.ts"
import type { FC } from "react"
import type * as z from "zod/mini"

import styles from "./menuModalTool.module.css"

type Props = {
  theme: z.output<typeof themeSchema>
}

export const MenuModalTool: FC<Props> = (props) => {
  const {
    languageLegendText,
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
    themeLegendText,
  } = useTool(props)

  return (
    <ul className={styles.root}>
      <li>
        <OptionSwitcher
          handleChange={selectLanguage}
          items={LANGUAGE_ITEMS}
          legendText={languageLegendText}
          selectedValue={locale}
        />
      </li>

      <li>
        <OptionSwitcher
          handleChange={selectTheme}
          items={themeItems}
          legendText={themeLegendText}
          selectedValue={localTheme}
        />
      </li>
    </ul>
  )
}
