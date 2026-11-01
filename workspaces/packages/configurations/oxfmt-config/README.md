# @ts-items/oxfmt-config

## How to install

```sh
npm i -D @ts-items/oxfmt-config oxfmt
```

## How to use

Create `oxfmt.config.mts`:

```ts
import { baseConfig } from "@ts-items/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...baseConfig,
})
```
