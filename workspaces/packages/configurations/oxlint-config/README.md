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
