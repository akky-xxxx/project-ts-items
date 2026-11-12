"use client"
import { Popover } from "../../../components/feature/Popover/Popover.tsx"
import { GitHubIcon } from "../../../components/icons/GitHubIcon/GitHubIcon.tsx"
import { LanguageIcon } from "../../../components/icons/LanguageIcon/LanguageIcon.tsx"
import { BLANK_LINK_PROPERTIES } from "../../../constants/BLANK_LINK_PROPERTIES/BLANK_LINK_PROPERTIES.ts"
import { OptionSwitcher } from "../OptionSwitcher/OptionSwitcher.tsx"
import { LANGUAGE_ITEMS } from "./constants/LANGUAGE_ITEMS/LANGUAGE_ITEMS.ts"
import { useHeaderTool } from "./useHeaderTool.ts"

import type { themeSchema } from "../../../schemas/themeSchema/themeSchema.ts"
import type { FC } from "react"
import type * as z from "zod/mini"

import styles from "./headerTool.module.css"

type Props = {
  darkThemeText: string
  languageLegendText: string
  lightThemeText: string
  systemThemeText: string
  theme: z.output<typeof themeSchema>
  themeLegendText: string
}

const LANGUAGE_POPOVER_TARGET_ID = "language"
const THEME_POPOVER_TARGET_ID = "theme"

export const HeaderTool: FC<Props> = (props) => {
  const { languageLegendText, themeLegendText } = props
  const {
    currentLanguageName,
    currentThemeIcon,
    localTheme,
    locale,
    selectLanguage,
    selectTheme,
    themeItems,
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

      <a
        {...BLANK_LINK_PROPERTIES}
        className={styles.anchor}
        href="https://github.com/akky-xxxx/project-ts-items"
      >
        <GitHubIcon height={15} width={15} />
      </a>
    </div>
  )
}
