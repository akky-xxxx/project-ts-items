"use client"

import { CodeArea } from "../../../../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { COPY_ICON_ELEMENT } from "../../../../../../constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { Radio } from "../../../../../ui/Radio/Radio.tsx"
import { Toggle } from "../../../../../ui/Toggle/Toggle.tsx"
import { BASES } from "./constants/BASES/BASES.ts"
import { useOxlintConfigSetup } from "./useOxlintConfigSetup.ts"

import type { Base } from "./types/Base/Base.ts"
import type { CodeBlockMap } from "./types/CodeBlockMap/CodeBlockMap.ts"
import type { FC } from "react"

import styles from "./oxlintConfigSetup.module.css"

type Props = {
  /** Shiki を client のバンドルに含めないよう、server component で getCodeBlockMap() から作ったマップ */
  codeBlockMap: CodeBlockMap
}

const BASE_SKILL_LABEL_MAP = {
  next: "Next.js",
  react: "React",
  ts: "TypeScript",
} as const satisfies Record<Base, string>

export const OxlintConfigSetup: FC<Props> = (props) => {
  const { codeBlockMap } = props
  const { handleChangeBase, selectConfiguration, selectedBase, sourceKey, switchItems } =
    useOxlintConfigSetup()
  const { code, codeBlock } = codeBlockMap[sourceKey]

  return (
    <div className={styles.root}>
      <fieldset className={styles.configurationFieldset}>
        <legend className={styles.configurationLegend}>{selectConfiguration}</legend>

        <ul className={styles.configurationUl}>
          {BASES.map((base) => (
            <li key={base} className={styles.configurationLi}>
              <Radio
                checked={base === selectedBase}
                labelText={BASE_SKILL_LABEL_MAP[base]}
                name="base"
                onChange={handleChangeBase(base)}
                value={base}
              />
            </li>
          ))}
        </ul>
      </fieldset>

      <ul className={styles.switcherUl}>
        {switchItems.map((switchItem) => (
          <li key={switchItem.name}>
            <Toggle {...switchItem} />
          </li>
        ))}
      </ul>

      <div className={styles.codeArea}>
        <CodeArea
          copyTargetText={code}
          copyIconElement={COPY_ICON_ELEMENT}
          title="oxlint.config.mts"
        >
          {codeBlock}
        </CodeArea>
      </div>
    </div>
  )
}
