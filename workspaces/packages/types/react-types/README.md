# @ts-items/react-types

General-purpose React types not provided by `@types/react`.

## Installation

```bash
npm install --save-dev @ts-items/react-types
```

`@types/react` (18 or later) and `typescript` (5.0 or later) are required as peer dependencies.

## Types

### `CustomCSSProperties`

`CSSProperties` that also accepts CSS custom properties (`--*`).

```tsx
import type { CustomCSSProperties } from "@ts-items/react-types"

const style: CustomCSSProperties = { "--gap": 8, "color": "red" }
```

### `FcWithChildren`

`FC` whose props include `children`.

```tsx
import type { FcWithChildren } from "@ts-items/react-types"

const Layout: FcWithChildren<{ title: string }> = ({ children, title }) => (
  <section>
    <h1>{title}</h1>
    {children}
  </section>
)
```
