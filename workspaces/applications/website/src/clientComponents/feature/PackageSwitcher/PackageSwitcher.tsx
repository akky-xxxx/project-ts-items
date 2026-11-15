"use client"

import { Fragment } from "react"

import { Popover } from "../../../components/feature/Popover/Popover.tsx"
import { OptionSwitcher } from "../OptionSwitcher/OptionSwitcher.tsx"
import { PACKAGE_ITEMS } from "./constants/PACKAGE_ITEMS/PACKAGE_ITEMS.ts"
import { usePackageSwitcher } from "./usePackageSwitcher.ts"

import type { FC } from "react"

import styles from "./packageSwitcher.module.css"

const PACKAGE_POPOVER_TARGET_ID = "package-switcher"

export const PackageSwitcher: FC = () => {
  const { currentPackageName, handleSelectPackage, translate } = usePackageSwitcher()

  return (
    <Fragment>
      <button className={styles.button} popoverTarget={PACKAGE_POPOVER_TARGET_ID} type="button">
        {currentPackageName}
      </button>
      <Popover id={PACKAGE_POPOVER_TARGET_ID}>
        <OptionSwitcher
          handleChange={handleSelectPackage}
          items={PACKAGE_ITEMS}
          legendText={translate("packageLegend")}
          selectedValue={currentPackageName}
        />
      </Popover>
    </Fragment>
  )
}
