import { CodeArea } from "../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { COPY_ICON_ELEMENT } from "../../../constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { INDENT_SIZE } from "../../../constants/INDENT_SIZE/INDENT_SIZE.ts"
import { CodeBlock } from "../CodeBlock/CodeBlock.tsx"
import { Heading } from "../Heading/Heading.tsx"
import { SeverityLabel } from "./components/SeverityLabel/SeverityLabel.tsx"

import type { FC } from "react"

import styles from "./ruleDetail.module.css"

type PropsWithOption = {
  descriptionBase: Record<string, unknown>
  originOption: unknown
  ruleName: string
  severity: unknown
}
type PropsWithoutOption = {
  descriptionBase: undefined
  originOption: undefined
  ruleName: string
  severity: unknown
}

type Props = PropsWithOption | PropsWithoutOption

export const RuleDetail: FC<Props> = (props) => {
  const { originOption, ruleName, severity } = props
  const hasOption = originOption !== undefined
  const code = hasOption ? JSON.stringify(originOption, null, INDENT_SIZE) : ""

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Heading headingTag="h4" id={ruleName}>
          {ruleName}
        </Heading>
        <SeverityLabel severity={severity} />
      </header>

      {hasOption ? (
        <CodeArea copyIconElement={COPY_ICON_ELEMENT} copyTargetText={code} title="JSON">
          <CodeBlock code={code} lang="typescript" />
        </CodeArea>
      ) : null}
    </div>
  )
}
