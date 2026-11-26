import { CodeArea } from "../../../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { COPY_ICON_ELEMENT } from "../../../../../constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { CodeBlock } from "../../../../ui/CodeBlock/CodeBlock.tsx"
import { Section } from "../../../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../../../ui/Heading/Heading.tsx"

import type { ComponentProps, FC, ReactNode } from "react"

import styles from "./typeRecord.module.css"

type Props = {
  code: string
  description: ReactNode
  lang: ComponentProps<typeof CodeBlock>["lang"]
  typeName: string
}

export const TypeRecord: FC<Props> = (props) => {
  const { code, description, lang, typeName } = props

  return (
    <Section>
      <Heading headingTag="h3">{typeName}</Heading>

      <p>{description}</p>

      <div className={styles.codeWrapper}>
        <CodeArea copyIconElement={COPY_ICON_ELEMENT} copyTargetText={code} title="code">
          <CodeBlock code={code} lang={lang} />
        </CodeArea>
      </div>
    </Section>
  )
}
