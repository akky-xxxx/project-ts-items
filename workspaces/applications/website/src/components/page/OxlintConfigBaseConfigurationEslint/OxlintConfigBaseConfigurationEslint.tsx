import { Fragment } from "react"

import { CodeArea } from "../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { OxlintRuleDetail } from "../../layout/OxlintRuleDetail/OxlintRuleDetail.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { CodeBlock } from "../../ui/CodeBlock/CodeBlock.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { OxlintRuleDetailDescription } from "../../ui/OxlintRuleDetailDescription/OxlintRuleDetailDescription.tsx"
import { OxlintRuleDetailSeverityLabel } from "../../ui/OxlintRuleDetailSeverityLabel/OxlintRuleDetailSeverityLabel.tsx"
import { COPY_ICON_ELEMENT } from "../OxfmtConfigHomeQuickstart/constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"
import { RULE_DETAILS } from "./constants/RULE_DETAILS/RULE_DETAILS.ts"

import type { FC } from "react"

export const OxlintConfigBaseConfigurationEslint: FC = () => (
  <Fragment>
    <Breadcrumb currentPageText="Base configuration" />

    <Heading1Wrapper>
      <Heading headingTag="h1">Base configuration - eslint based</Heading>
    </Heading1Wrapper>

    <p>Description for Base Configuration</p>

    <Section>
      <Heading headingTag="h2">Rule details</Heading>

      {RULE_DETAILS.map((detail) => {
        const { descriptionBase, originOption, ruleName, severity } = detail
        const code = JSON.stringify(originOption, null, 2)

        return (
          <OxlintRuleDetail
            key={ruleName}
            code={
              <CodeArea copyTargetText={code} title="Options" copyIconElement={COPY_ICON_ELEMENT}>
                <CodeBlock code={code} lang="typescript" />
              </CodeArea>
            }
            severity={<OxlintRuleDetailSeverityLabel severity={severity} />}
            ruleName={ruleName}
            description={<OxlintRuleDetailDescription options={descriptionBase} />}
          />
        )
      })}
    </Section>
  </Fragment>
)
