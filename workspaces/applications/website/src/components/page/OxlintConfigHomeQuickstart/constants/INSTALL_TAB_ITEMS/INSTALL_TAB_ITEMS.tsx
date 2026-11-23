import { CodeBlock } from "../../../../ui/CodeBlock/CodeBlock.tsx"

import type { Tab } from "../../../../../clientComponents/feature/Tab/Tab.tsx"
import type { ComponentProps } from "react"

export const INSTALL_TAB_ITEMS: ComponentProps<typeof Tab>["items"] = [
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
