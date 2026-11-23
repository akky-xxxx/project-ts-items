"use client"
import { Popover } from "../../../components/feature/Popover/Popover.tsx"
import { LanguageIcon } from "../../../components/icons/LanguageIcon/LanguageIcon.tsx"
import { OptionSwitcher } from "../OptionSwitcher/OptionSwitcher.tsx"
import { LANGUAGE_ITEMS } from "./constants/LANGUAGE_ITEMS/LANGUAGE_ITEMS.ts"
import { useHeaderTool } from "./useHeaderTool.ts"

import type { themeSchema } from "../../../schemas/themeSchema/themeSchema.ts"
import type { FC } from "react"
import type * as z from "zod/mini"

import styles from "./headerTool.module.css"

type Props = {
  theme: z.output<typeof themeSchema>
}

const LANGUAGE_POPOVER_TARGET_ID = "language"
const THEME_POPOVER_TARGET_ID = "theme"

export const HeaderTool: FC<Props> = (props) => {
  const {
    currentLanguageName,
    currentThemeIcon,
    languageLegendText,
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
    themeLegendText,
  } = useHeaderTool(props)

  return (
    <div className={styles.root}>
      <button
        className={styles.languageButton}
        popoverTarget={LANGUAGE_POPOVER_TARGET_ID}
        type="button"
      >
        <LanguageIcon aria-hidden height={13} width={13} />
        {currentLanguageName}
      </button>
      <Popover id={LANGUAGE_POPOVER_TARGET_ID}>
        <OptionSwitcher
          handleChange={selectLanguage}
          items={LANGUAGE_ITEMS}
          legendText={languageLegendText}
          selectedValue={locale}
        />
      </Popover>

      <button className={styles.themeButton} popoverTarget={THEME_POPOVER_TARGET_ID} type="button">
        {currentThemeIcon}
      </button>
      <Popover id={THEME_POPOVER_TARGET_ID}>
        <OptionSwitcher
          handleChange={selectTheme}
          items={themeItems}
          legendText={themeLegendText}
          selectedValue={localTheme}
        />
      </Popover>
    </div>
  )
}
