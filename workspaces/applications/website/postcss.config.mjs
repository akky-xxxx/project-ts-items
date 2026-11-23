import postcssGlobalData from "@csstools/postcss-global-data"
import postcssCustomMedia from "postcss-custom-media"

export default {
  plugins: [
    // Memo: postcss-custom-media より前に置く
    postcssGlobalData({ files: ["./src/app/[locale]/presets.css"], prepend: true }),
    postcssCustomMedia(),
  ],
}
