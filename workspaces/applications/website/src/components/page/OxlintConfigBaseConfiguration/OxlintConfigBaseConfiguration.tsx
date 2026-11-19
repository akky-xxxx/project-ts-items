import { baseConfig } from "@ts-items/oxlint-config"
import { Fragment } from "react"

import { CodeArea } from "../../../clientComponents/feature/CodeArea/CodeArea.tsx"
import { ExpandableContents } from "../../../clientComponents/feature/ExpandableContents/ExpandableContents.tsx"
import { Breadcrumb } from "../../ui/Breadcrumb/Breadcrumb.tsx"
import { CodeBlock } from "../../ui/CodeBlock/CodeBlock.tsx"
import { Heading1Wrapper, Section } from "../../ui/docsElements/docsElements.tsx"
import { Heading } from "../../ui/Heading/Heading.tsx"
import { COPY_ICON_ELEMENT } from "../OxfmtConfigHomeQuickstart/constants/COPY_ICON_ELEMENT/COPY_ICON_ELEMENT.tsx"

import type { FC } from "react"

const OVERALL_STRUCTURE = JSON.stringify(baseConfig, null, 2)

export const OxlintConfigBaseConfiguration: FC = () => (
  <Fragment>
    <Breadcrumb currentPageText="Base configuration" />

    <Heading1Wrapper>
      <Heading headingTag="h1">Base configuration</Heading>
    </Heading1Wrapper>

    <p>Description for Base Configuration</p>

    <Section>
      <Heading headingTag="h2">Overall structure</Heading>

      <CodeArea copyIconElement={COPY_ICON_ELEMENT} copyTargetText={OVERALL_STRUCTURE} title="JSON">
        <ExpandableContents>
          <CodeBlock code={OVERALL_STRUCTURE} lang="typescript" />
        </ExpandableContents>
      </CodeArea>
    </Section>

    <Section>
      <Heading headingTag="h2">ESlint rules</Heading>
    </Section>
  </Fragment>
)
