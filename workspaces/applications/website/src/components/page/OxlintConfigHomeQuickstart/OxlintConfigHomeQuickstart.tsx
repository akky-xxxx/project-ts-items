import { Fragment } from "react"

import { Tab } from "../../../clientComponents/feature/Tab/Tab.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { CodeBlock } from "../../ui/CodeBlock/CodeBlock.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { getCodeBlockMap } from "./clientComponents/feature/OxlintConfigSetup/modules/getCodeBlockMap/getCodeBlockMap.tsx"
import { OxlintConfigSetup } from "./clientComponents/feature/OxlintConfigSetup/OxlintConfigSetup.tsx"
import { COPY_ICON_ELEMENT } from "./constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"

import type { ReactNode, ComponentProps, FC } from "react"

import styles from "./oxlintConfigHomeQuickstart.module.css"

type Props = {
  breadcrumbItems: ComponentProps<typeof Breadcrumb>["items"]
  breadcrumbLabelText: string
  copiedText: string
  copyButtonLabelText: string
  installTitleText: string
  pageDescriptionText: ReactNode
  pageTitle: string
  setupTitleText: string
}

const INSTALL_TAB_ITEMS: ComponentProps<typeof Tab>["items"] = [
  {
    copyText: "npm i -D oxlint @ts-items/oxlint-config",
    tabContent: <CodeBlock code="npm i -D oxlint @ts-items/oxlint-config" lang="bash" />,
    tabLabelText: "npm",
    tabValue: "npm",
  },
  {
    copyText: "yarn add -D oxlint @ts-items/oxlint-config",
    tabContent: <CodeBlock code="yarn add -D oxlint @ts-items/oxlint-config" lang="bash" />,
    tabLabelText: "yarn",
    tabValue: "yarn",
  },
  {
    copyText: "pnpm add -D oxlint @ts-items/oxlint-config",
    tabContent: <CodeBlock code="pnpm add -D oxlint @ts-items/oxlint-config" lang="bash" />,
    tabLabelText: "pnpm",
    tabValue: "pnpm",
  },
  {
    copyText: "bun add -D oxlint @ts-items/oxlint-config",
    tabContent: <CodeBlock code="bun add -D oxlint @ts-items/oxlint-config" lang="bash" />,
    tabLabelText: "bun",
    tabValue: "bun",
  },
]

const CODE_BLOCK_MAP = getCodeBlockMap()

export const OxlintConfigHomeQuickstart: FC<Props> = (props) => {
  const {
    breadcrumbItems,
    breadcrumbLabelText,
    copiedText,
    copyButtonLabelText,
    installTitleText,
    pageDescriptionText,
    pageTitle,
    setupTitleText,
  } = props

  return (
    <Fragment>
      <Breadcrumb items={breadcrumbItems} labelText={breadcrumbLabelText} />

      <div className={styles.heading1Wrapper}>
        <Heading headingTag="h1">{pageTitle}</Heading>
      </div>

      <p>{pageDescriptionText}</p>

      <section className={styles.section}>
        <Heading headingTag="h2">{installTitleText}</Heading>

        <div className={styles.tabWrapper}>
          <Tab
            copiedText={copiedText}
            copyButtonLabelText={copyButtonLabelText}
            copyIconElement={COPY_ICON_ELEMENT}
            items={INSTALL_TAB_ITEMS}
            title="Terminal"
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading headingTag="h2">{setupTitleText}</Heading>

        <div className={styles.oxlintConfigSetupWrapper}>
          <OxlintConfigSetup codeBlockMap={CODE_BLOCK_MAP} />
        </div>
      </section>
    </Fragment>
  )
}
