# @ts-items/oxlint-config

## How to install

```sh
npm i -D @ts-items/oxlint-config oxlint
```

To enable type-aware linting (`typeAware: true`), also install `oxlint-tsgolint`:

```sh
npm i -D oxlint-tsgolint
```

## How to use

Create `oxlint.config.mts`:

### For TypeScript projects

```ts
import { baseConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [baseConfig],
  options: {
    typeAware: true, // Optional but recommended. Requires `oxlint-tsgolint`
  },
})
```

### For React + TypeScript projects

```ts
import { reactConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [reactConfig],
  options: {
    typeAware: true, // Optional but recommended. Requires `oxlint-tsgolint`
  },
})
```

### For Next.js + TypeScript projects

```ts
import { nextConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [nextConfig],
  options: {
    typeAware: true, // Optional but recommended. Requires `oxlint-tsgolint`
  },
})
```

### For Storybook with some React Project

Turn off some rules that are not suitable with Storybook

```ts
import { storybookConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [storybookConfig],
  // some config for react
})
```

### For Vitest with some TypeScript Project

Enable the vitest plugin and adjust some of its rules for Vitest.
`vitest/prefer-importing-vitest-globals` is enabled only for test files (`*.spec.*`, `*.test.*`, `spec/**`), so `expect` imported from `storybook/test` in stories is not reported.

```ts
import { vitestConfig } from "@ts-items/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [vitestConfig],
  // some config for typescript
})
```
