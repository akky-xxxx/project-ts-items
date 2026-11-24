import { CodeBlock } from "./CodeBlock.tsx"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: CodeBlock,

  argTypes: {
    code: { description: "表示するコード" },
    lang: { description: "syntax highlight に使う言語(bash・tsx・typescript)" },
  },
} satisfies Meta<typeof CodeBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Bash: Story = {
  args: {
    code: "bun add -D @ts-items/oxlint-config oxlint",
    lang: "bash",
  },
}

export const Tsx: Story = {
  args: {
    code: "const Greeting = () => <div>Hello World</div>",
    lang: "tsx",
  },
}

export const TypeScript: Story = {
  args: {
    code: [
      'import { baseConfig } from "@ts-items/oxlint-config"',
      'import { defineConfig } from "oxlint"',
      "",
      "const config = defineConfig({",
      "  extends: [baseConfig],",
      "})",
      "",
      "export default config",
    ].join("\n"),
    lang: "typescript",
  },
}
