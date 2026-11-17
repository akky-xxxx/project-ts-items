import { CodeBlock } from "../../../../ui/CodeBlock/CodeBlock.tsx"

import type { Tab } from "../../../../../clientComponents/feature/Tab/Tab.tsx"
import type { ComponentProps } from "react"

export const INSTALL_TAB_ITEMS: ComponentProps<typeof Tab>["items"] = [
  {
    copyText: "npm i -D oxfmt @ts-items/oxfmt-config",
    tabContent: <CodeBlock code="npm i -D oxfmt @ts-items/oxfmt-config" lang="bash" />,
    tabLabelText: "npm",
    tabValue: "npm",
  },
  {
    copyText: "yarn add -D oxfmt @ts-items/oxfmt-config",
    tabContent: <CodeBlock code="yarn add -D oxfmt @ts-items/oxfmt-config" lang="bash" />,
    tabLabelText: "yarn",
    tabValue: "yarn",
  },
  {
    copyText: "pnpm add -D oxfmt @ts-items/oxfmt-config",
    tabContent: <CodeBlock code="pnpm add -D oxfmt @ts-items/oxfmt-config" lang="bash" />,
    tabLabelText: "pnpm",
    tabValue: "pnpm",
  },
  {
    copyText: "bun add -D oxfmt @ts-items/oxfmt-config",
    tabContent: <CodeBlock code="bun add -D oxfmt @ts-items/oxfmt-config" lang="bash" />,
    tabLabelText: "bun",
    tabValue: "bun",
  },
]
