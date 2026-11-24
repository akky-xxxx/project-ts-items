export const CUSTOM_CSS_PROPERTIES_CODE = `import type { CustomCSSProperties } from "@ts-items/react-types"

const Box = () => {
  const style: CustomCSSProperties = { "--gap": 8, "color": "red" }

  return <div style={style}>Hello World</div>
}`
