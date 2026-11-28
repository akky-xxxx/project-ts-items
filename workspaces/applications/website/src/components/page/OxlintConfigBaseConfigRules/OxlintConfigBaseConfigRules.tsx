import { baseConfig } from "@ts-items/oxlint-config"
import { useTranslations } from "next-intl"
import { Fragment } from "react"

import { CodeArea } from "../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { ExpandableContents } from "../../../clientComponents/feature/ExpandableContents/ExpandableContents.tsx"
import { COPY_ICON_ELEMENT } from "../../../constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { INDENT_SIZE } from "../../../constants/INDENT_SIZE/INDENT_SIZE.ts"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { CodeBlock } from "../../ui/CodeBlock/CodeBlock.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { RuleDetail } from "../../ui/RuleDetail/RuleDetail.tsx"
import { CATEGORIES } from "./constants/CATEGORIES/CATEGORIES.ts"
import { createBaseConfigRuleDetails } from "./modules/createBaseConfigRuleDetails/createBaseConfigRuleDetails.ts"

import type { ComponentProps, FC } from "react"

import styles from "./oxlintConfigBaseConfigRules.module.css"

const OVERALL = JSON.stringify(baseConfig, null, INDENT_SIZE)
const baseConfigRuleDetails = createBaseConfigRuleDetails()

type Props = {
  breadcrumbItems: NonNullable<ComponentProps<typeof Breadcrumb>["items"]>
}

export const OxlintConfigBaseConfigRules: FC<Props> = (props) => {
  const { breadcrumbItems } = props
  const pagesTranslate = useTranslations("pages")
  const pageTitleText = pagesTranslate("oxlintConfigBaseConfigRules.pageTitle")

  return (
    <Fragment>
      <Breadcrumb currentPageText={pageTitleText} items={breadcrumbItems} />

      <Heading1Wrapper>
        <Heading headingTag="h1" id="overall">
          {pageTitleText}
        </Heading>
      </Heading1Wrapper>

      <ExpandableContents>
        <CodeArea copyTargetText={OVERALL} title="JSON" copyIconElement={COPY_ICON_ELEMENT}>
          <CodeBlock code={OVERALL} lang="typescript" />
        </CodeArea>
      </ExpandableContents>

      <Section>
        <Heading headingTag="h2" id="rules">
          {pagesTranslate("oxlintConfigBaseConfigRules.rules")}
        </Heading>

        {CATEGORIES.map((category) => (
          <Section key={category}>
            <Heading headingTag="h3" id={category}>
              {pagesTranslate("oxlintConfigBaseConfigRules.categoryHeading", { category })}
            </Heading>

            <ul className={styles.ul}>
              {baseConfigRuleDetails[category].map((detail) => (
                <li key={detail.ruleName}>
                  <RuleDetail {...detail} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </Section>
    </Fragment>
  )
}
