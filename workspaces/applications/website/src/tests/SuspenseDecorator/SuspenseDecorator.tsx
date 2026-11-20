import { Suspense } from "react"

import type { Decorator } from "@storybook/nextjs-vite"

/**
 * @description
 * async component(server component)を storybook で描画するための decorator
 */
export const SuspenseDecorator: Decorator = (Story) => (
  <Suspense>
    <Story />
  </Suspense>
)
