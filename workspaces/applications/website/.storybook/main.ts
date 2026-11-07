import path from "node:path"
import url from "node:url"

import type { StorybookConfig } from "@storybook/nextjs-vite"

const getAbsolutePath = (value: string) =>
  path.dirname(url.fileURLToPath(import.meta.resolve(`${value}/package.json`)))

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mcp"),
  ],
  framework: getAbsolutePath("@storybook/nextjs-vite"),
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
}
export default config
