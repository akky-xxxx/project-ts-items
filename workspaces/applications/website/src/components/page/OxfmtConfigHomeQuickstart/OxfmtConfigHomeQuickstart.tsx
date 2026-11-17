import { Fragment } from "react"

import { CodeArea } from "../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { Tab } from "../../../clientComponents/feature/Tab/Tab.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { CodeBlock } from "../../ui/CodeBlock/CodeBlock.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { COPY_ICON_ELEMENT } from "./constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { INSTALL_TAB_ITEMS } from "./constants/INSTALL_TAB_ITEMS/INSTALL_TAB_ITEMS.tsx"
import { SETTING_CODE } from "./constants/SETTING_CODE/SETTING_CODE.ts"

import type { ReactNode, ComponentProps, FC } from "react"

import styles from "./oxfmtConfigHomeQuickstart.module.css"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: string
  installTitleText: string
  pageDescriptionText: ReactNode
  pageTitle: string
  setupTitleText: string
}

export const OxfmtConfigHomeQuickstart: FC<Props> = (props) => {
  const {
    breadcrumbItems,
    breadcrumbLabelText,
    installTitleText,
    pageDescriptionText,
    pageTitle,
    setupTitleText,
  } = props

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <Heading1Wrapper>
        <Heading headingTag="h1">{pageTitle}</Heading>
      </Heading1Wrapper>

      <p>{pageDescriptionText}</p>

      <Section>
        <Heading headingTag="h2">{installTitleText}</Heading>

        <div className={styles.tabWrapper}>
          <Tab
            copyIconElement={COPY_ICON_ELEMENT}
            items={INSTALL_TAB_ITEMS}
            title="Terminal"
          />
        </div>
      </Section>

      <Section>
        <Heading headingTag="h2">{setupTitleText}</Heading>

        <div className={styles.oxfmtConfigSetupWrapper}>
          <CodeArea
            copyIconElement={COPY_ICON_ELEMENT}
            copyTargetText={SETTING_CODE}
            title="oxfmt.config.mts"
          >
            <CodeBlock code={SETTING_CODE} lang="typescript" />
          </CodeArea>
        </div>
      </Section>
    </Fragment>
  )
}
